# 第三方API服务模型获取指南

## 🎯 针对你的情况

从你的测试结果看，你使用的是第三方API服务（ai.nyabit.com），这种情况下我们需要直接从你配置的API获取正确的模型列表。

## 🔧 解决方案

### 1. 使用新增的专用函数

我为你添加了专门的函数来获取用户配置API的模型列表：

```javascript
// 获取你配置的API的模型列表
getUserConfiguredModels()

// 刷新并显示用户配置的模型
refreshUserModels()
```

### 2. 操作步骤

#### 步骤1：确保API配置正确
1. 在AI配置中确认：
   - **API URL**: `https://ai.nyabit.com/v1`
   - **API Key**: 你的密钥
   - **API类型**: 选择 `OpenAI (ChatGPT)`

#### 步骤2：获取正确的模型列表
在浏览器控制台运行：
```javascript
// 测试你的API配置
getUserConfiguredModels()
```

#### 步骤3：刷新模型列表
```javascript
// 刷新并更新下拉列表
refreshUserModels()
```

#### 步骤4：使用UI刷新
1. 确保API URL和密钥已配置
2. 点击"🔄 刷新"按钮
3. 系统会优先从你的API获取模型列表

## 🔍 预期结果

成功后你应该看到：

```
🎯 获取用户配置API的模型列表...
🔗 API URL: https://ai.nyabit.com/v1
🔑 API Key: 已设置
📡 尝试获取模型列表: https://ai.nyabit.com/v1/models
✅ 成功获取模型列表: {data: [...]}
📋 解析出 X 个模型: ["gpt-4", "gpt-3.5-turbo", ...]
🎉 发现 X 个可用模型
```

下拉列表会显示：
```
━━━ 用户配置API ━━━
✅ gpt-4
✅ gpt-3.5-turbo
✅ claude-3-sonnet
...
```

## 🛠️ 故障排除

### 如果仍然获取不到模型

#### 1. 检查API端点
你的API可能使用不同的端点格式，尝试：
```javascript
// 手动测试不同的端点
const testEndpoints = [
    'https://ai.nyabit.com/v1/models',
    'https://ai.nyabit.com/models',
    'https://ai.nyabit.com/api/models',
    'https://ai.nyabit.com/v1/engines'
];

for (const endpoint of testEndpoints) {
    try {
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ ${endpoint}:`, data);
        } else {
            console.log(`❌ ${endpoint}: ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ ${endpoint}: ${error.message}`);
    }
}
```

#### 2. 查看API文档
根据错误信息提示，访问：https://ai.nyabit.com/pricing
- 查看可用的模型名称
- 复制正确的模型名称

#### 3. 手动配置模型
如果API不提供模型列表端点，你可以：
1. 在"AI模型"输入框中直接输入正确的模型名
2. 常见的模型名称可能是：
   - `gpt-4`
   - `gpt-3.5-turbo`
   - `claude-3-sonnet-20240229`
   - `gemini-pro`

## 🎯 针对ai.nyabit.com的特殊处理

基于你的错误信息，这个API服务有特定的模型名称要求。让我添加一个专门的处理函数：

```javascript
// 专门针对ai.nyabit.com的模型获取
window.getNyabitModels = async function() {
    console.log("🐱 获取Nyabit API模型列表...");
    
    const apiKey = $('#ai-key-input').val();
    if (!apiKey) {
        console.log("❌ 请先配置API密钥");
        return [];
    }
    
    // 尝试多个可能的端点
    const endpoints = [
        'https://ai.nyabit.com/v1/models',
        'https://ai.nyabit.com/models',
        'https://ai.nyabit.com/api/v1/models'
    ];
    
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ 从 ${endpoint} 获取到:`, data);
                return data;
            }
        } catch (error) {
            console.log(`❌ ${endpoint}: ${error.message}`);
        }
    }
    
    // 如果API不提供模型列表，返回常见模型
    console.log("📋 API不提供模型列表，返回常见模型名称");
    return {
        data: [
            { id: "gpt-4", object: "model" },
            { id: "gpt-3.5-turbo", object: "model" },
            { id: "claude-3-sonnet-20240229", object: "model" },
            { id: "claude-3-haiku-20240307", object: "model" },
            { id: "gemini-pro", object: "model" }
        ]
    };
};
```

## 🚀 立即测试

现在请按以下步骤测试：

### 1. 确认配置
```javascript
console.log("API URL:", $('#ai-url-input').val());
console.log("API Key:", $('#ai-key-input').val() ? "已设置" : "未设置");
```

### 2. 获取模型列表
```javascript
refreshUserModels()
```

### 3. 如果上述方法不行，尝试Nyabit专用方法
```javascript
getNyabitModels()
```

### 4. 手动设置模型
如果自动获取失败，请：
1. 访问 https://ai.nyabit.com/pricing
2. 查看可用模型名称
3. 在"AI模型"输入框中手动输入正确的模型名

## 💡 建议

1. **优先使用refreshUserModels()** - 这会直接从你的API获取模型
2. **检查API文档** - 确认正确的模型名称格式
3. **手动配置备选** - 如果自动获取失败，手动输入模型名
4. **测试连接** - 配置完成后使用"测试连接"功能验证

这样应该能解决你的模型名称问题！🎯
