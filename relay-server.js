// 虚拟宠物插件 - Node.js 中继服务器
// 用于解决移动端和网络连接问题

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 中间件配置 ---

// 1. CORS 中间件：允许插件访问这个服务器
// 开发阶段允许所有来源，生产环境应该限制为特定域名
app.use(cors({
    origin: '*', // 生产环境应改为具体的域名
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-goog-api-key', 'anthropic-version']
}));

// 2. JSON 解析中间件：让服务器能解析请求体中的JSON数据
app.use(express.json({ limit: '10mb' }));

// 3. 请求日志中间件
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
    next();
});

// --- 健康检查端点 ---
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// --- 核心代理路由 ---

// 我们创建一个 /proxy 端点，接收所有POST请求
app.post('/proxy', async (req, res) => {
    // 从插件发来的请求体中解构出目标API的信息
    const { targetUrl, method, headers, body } = req.body;

    // 基本的验证
    if (!targetUrl || !method) {
        console.error('❌ 缺少必要参数:', { targetUrl, method });
        return res.status(400).json({ 
            error: 'Missing targetUrl or method in request body',
            received: { targetUrl: !!targetUrl, method: !!method }
        });
    }

    console.log(`🔄 代理请求: ${method.toUpperCase()} ${targetUrl}`);
    console.log(`📋 请求头数量: ${headers ? Object.keys(headers).length : 0}`);
    console.log(`📦 请求体大小: ${body ? JSON.stringify(body).length : 0} 字符`);

    try {
        // 使用 axios 向目标API发起请求
        const axiosConfig = {
            url: targetUrl,
            method: method.toLowerCase(),
            headers: headers || {},
            timeout: 60000, // 60秒超时
            // 确保axios在失败时（如4xx, 5xx状态码）也会返回响应
            validateStatus: (status) => status < 600
        };

        // 只有在有请求体时才添加data字段
        if (body && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'PATCH')) {
            axiosConfig.data = body;
        }

        console.log(`⏳ 发送请求到目标API...`);
        const startTime = Date.now();
        
        const response = await axios(axiosConfig);
        
        const duration = Date.now() - startTime;
        console.log(`✅ 目标API响应: ${response.status} ${response.statusText} (${duration}ms)`);
        console.log(`📊 响应数据大小: ${JSON.stringify(response.data).length} 字符`);

        // 将目标API的响应头和响应体，原样返回给插件
        // 过滤掉一些可能导致问题的响应头
        const filteredHeaders = { ...response.headers };
        delete filteredHeaders['content-encoding'];
        delete filteredHeaders['transfer-encoding'];
        delete filteredHeaders['connection'];

        res.status(response.status).set(filteredHeaders).json(response.data);

    } catch (error) {
        console.error('❌ 代理请求失败:', error.message);

        // 如果是axios的错误，它可能包含更详细的响应信息
        if (error.response) {
            console.log(`📋 错误响应状态: ${error.response.status} ${error.response.statusText}`);
            console.log(`📋 错误响应数据:`, error.response.data);
            
            // 过滤响应头
            const filteredHeaders = { ...error.response.headers };
            delete filteredHeaders['content-encoding'];
            delete filteredHeaders['transfer-encoding'];
            delete filteredHeaders['connection'];
            
            res.status(error.response.status).set(filteredHeaders).json(error.response.data);
        } else if (error.code === 'ECONNABORTED') {
            // 超时错误
            console.log('⏰ 请求超时');
            res.status(504).json({ 
                error: 'Gateway Timeout', 
                message: '目标API响应超时',
                code: 'TIMEOUT'
            });
        } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            // 网络连接错误
            console.log('🌐 网络连接错误:', error.code);
            res.status(502).json({ 
                error: 'Bad Gateway', 
                message: '无法连接到目标API',
                code: error.code
            });
        } else {
            // 其他未知错误
            console.log('❓ 未知错误:', error);
            res.status(502).json({ 
                error: 'Bad Gateway', 
                message: '中继服务器内部错误',
                details: error.message
            });
        }
    }
});

// --- 统计信息端点 ---
let requestCount = 0;
let successCount = 0;
let errorCount = 0;

// 请求计数中间件
app.use('/proxy', (req, res, next) => {
    requestCount++;
    
    // 监听响应完成
    res.on('finish', () => {
        if (res.statusCode < 400) {
            successCount++;
        } else {
            errorCount++;
        }
    });
    
    next();
});

app.get('/stats', (req, res) => {
    res.json({
        totalRequests: requestCount,
        successRequests: successCount,
        errorRequests: errorCount,
        successRate: requestCount > 0 ? (successCount / requestCount * 100).toFixed(2) + '%' : '0%',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

// --- 错误处理中间件 ---
app.use((error, req, res, next) => {
    console.error('🚨 服务器错误:', error);
    res.status(500).json({
        error: 'Internal Server Error',
        message: '服务器内部错误',
        timestamp: new Date().toISOString()
    });
});

// --- 404 处理 ---
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: '端点不存在',
        availableEndpoints: ['/health', '/proxy', '/stats'],
        timestamp: new Date().toISOString()
    });
});

// --- 启动服务器 ---
app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 虚拟宠物中继服务器启动成功！');
    console.log(`📡 服务器地址: http://0.0.0.0:${PORT}`);
    console.log(`🌐 公网访问: http://154.12.38.33:${PORT}`);
    console.log('📋 可用端点:');
    console.log(`  - GET  /health - 健康检查`);
    console.log(`  - POST /proxy  - API代理`);
    console.log(`  - GET  /stats  - 统计信息`);
    console.log('✅ 准备接收来自虚拟宠物插件的请求！');
});

// --- 优雅关闭 ---
process.on('SIGTERM', () => {
    console.log('📴 收到SIGTERM信号，正在优雅关闭服务器...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('📴 收到SIGINT信号，正在优雅关闭服务器...');
    process.exit(0);
});
