// 中继服务器测试脚本
const axios = require('axios');

const RELAY_SERVER_URL = 'http://154.12.38.33:3000';

async function testRelayServer() {
    console.log('🧪 开始测试中继服务器...');
    console.log(`📡 服务器地址: ${RELAY_SERVER_URL}`);
    
    try {
        // 1. 测试健康检查
        console.log('\n1️⃣ 测试健康检查...');
        const healthResponse = await axios.get(`${RELAY_SERVER_URL}/health`);
        console.log('✅ 健康检查成功:', healthResponse.data);
        
        // 2. 测试基本代理功能
        console.log('\n2️⃣ 测试基本代理功能...');
        const proxyResponse = await axios.post(`${RELAY_SERVER_URL}/proxy`, {
            targetUrl: 'https://httpbin.org/get',
            method: 'GET',
            headers: {
                'User-Agent': 'Virtual-Pet-Relay-Test/1.0'
            }
        });
        console.log('✅ 代理测试成功，状态码:', proxyResponse.status);
        console.log('📦 响应数据:', proxyResponse.data);
        
        // 3. 测试POST代理
        console.log('\n3️⃣ 测试POST代理...');
        const postResponse = await axios.post(`${RELAY_SERVER_URL}/proxy`, {
            targetUrl: 'https://httpbin.org/post',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                test: 'data',
                timestamp: new Date().toISOString()
            }
        });
        console.log('✅ POST代理测试成功，状态码:', postResponse.status);
        
        // 4. 测试统计信息
        console.log('\n4️⃣ 测试统计信息...');
        const statsResponse = await axios.get(`${RELAY_SERVER_URL}/stats`);
        console.log('✅ 统计信息获取成功:', statsResponse.data);
        
        console.log('\n🎉 所有测试通过！中继服务器运行正常。');
        
    } catch (error) {
        console.error('\n❌ 测试失败:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 请确保中继服务器已启动：');
            console.log('   npm install');
            console.log('   npm start');
        } else if (error.response) {
            console.log('📋 错误响应:', error.response.status, error.response.data);
        }
        
        process.exit(1);
    }
}

// 运行测试
testRelayServer();
