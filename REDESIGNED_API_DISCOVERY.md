# 重新设计的SillyTavern API发现功能

## 🔍 研究背景

经过深入研究SillyTavern的源代码和架构，我重新设计了API发现功能，采用更准确和可靠的方法来获取后端可用的API模型名称。

## 🎯 新的实现策略

### 1. SillyTavern标准API端点扫描

基于SillyTavern的实际架构，我们现在扫描以下标准端点：

```javascript
// OpenAI相关端点
/api/openai/models  - 获取OpenAI模型列表
/api/openai/status  - 获取OpenAI连接状态

// Claude相关端点  
/api/claude/models  - 获取Claude模型列表
/api/claude/status  - 获取Claude连接状态

// Google AI相关端点
/api/google/models  - 获取Google AI模型列表
/api/google/status  - 获取Google AI连接状态

// Ollama相关端点
/api/ollama/models  - 获取Ollama模型列表
/api/ollama/status  - 获取Ollama连接状态

// 通用端点
/api/models    - 通用模型列表
/api/backends  - 后端配置列表
/api/status    - 系统状态
```

### 2. SillyTavern上下文信息获取

通过`SillyTavern.getContext()`获取当前配置：
- `context.main_api` - 当前主要API类型
- `context.model` - 当前使用的模型
- `context.online_status` - 连接状态

### 3. 设置存储检查

检查localStorage中的SillyTavern配置：
- API配置信息
- 模型设置
- 连接历史

## 🔧 技术实现

### 核心函数重新设计

```javascript
async function getAvailableAPIs() {
    const availableAPIs = [];
    
    // 1. 扫描SillyTavern标准API端点
    const standardEndpoints = [
        { url: '/api/openai/models', type: 'openai', name: 'OpenAI模型' },
        { url: '/api/claude/models', type: 'claude', name: 'Claude模型' },
        // ... 更多端点
    ];
    
    // 2. 获取SillyTavern上下文
    if (SillyTavern && SillyTavern.getContext) {
        const context = SillyTavern.getContext();
        // 处理上下文信息
    }
    
    // 3. 检查设置存储
    // 扫描localStorage中的相关配置
    
    return availableAPIs;
}
```

### 增强的UI处理

```javascript
function updateAPIDropdown(apis) {
    // 按提供商分组显示
    const groupedAPIs = {};
    apis.forEach(api => {
        const group = api.provider || api.type;
        if (!groupedAPIs[group]) groupedAPIs[group] = [];
        groupedAPIs[group].push(api);
    });
    
    // 生成分组选项
    Object.entries(groupedAPIs).forEach(([group, groupAPIs]) => {
        // 为每个组创建optgroup
    });
}
```

### 智能配置处理

```javascript
function toggleApiConfigInputs(apiType) {
    // 处理检测到的API格式: detected:type:name
    if (apiType.startsWith('detected:')) {
        const [, detectedType, detectedName] = apiType.split(':');
        // 自动填充配置信息
        $('#ai-model-input').val(detectedName);
        // 提供配置建议
    }
}
```

## 🎨 用户界面改进

### 1. 状态图标系统

- ✅ `available` - API可用
- 🟢 `connected` - 已连接
- ⭐ `current` - 当前使用
- 🔧 `configured` - 已配置
- 💾 `stored` - 已存储
- 🔍 `detected` - 已检测
- ❓ `unknown` - 状态未知

### 2. 分组显示

API按提供商分组显示：
```
━━━ OpenAI模型 ━━━
✅ gpt-4
✅ gpt-3.5-turbo

━━━ Claude模型 ━━━  
🟢 claude-3-sonnet-20240229
🔧 claude-3-haiku-20240307

━━━ SillyTavern ━━━
⭐ OpenAI (ChatGPT) (当前使用)
```

### 3. 智能配置提示

选择检测到的API时：
- 自动填充模型名称
- 提供URL配置建议
- 显示配置指导信息

## 🔍 调试和测试

### 新增调试函数

1. **`diagnoseSillyTavernEnvironment()`** - 环境诊断
   - 检查SillyTavern对象
   - 验证必要函数
   - 分析页面环境

2. **`quickAPITest()`** - 快速测试
   - 基础检查
   - 关键端点测试
   - DOM元素验证

3. **`testVirtualPetAPIDiscovery()`** - 完整测试
   - 详细的API发现流程
   - 完整的日志输出
   - 结果分析

### 详细日志系统

```
[virtual-pet-system] 🔍 开始获取SillyTavern可用API列表...
[virtual-pet-system] 🌐 尝试SillyTavern标准API端点...
[virtual-pet-system] 🔗 测试端点: /api/openai/models
[virtual-pet-system] ✅ /api/openai/models 成功: {models: [...]}
[virtual-pet-system] 📋 检查SillyTavern上下文...
[virtual-pet-system] 🎯 当前主要API: openai
[virtual-pet-system] 🎉 最终发现 5 个可用API
```

## 🚀 使用方法

### 1. 基础使用

1. 确保在SillyTavern页面中运行
2. 打开虚拟宠物设置面板
3. 点击"🔄 刷新"按钮
4. 选择检测到的API
5. 配置相应参数

### 2. 调试使用

```javascript
// 环境检查
diagnoseSillyTavernEnvironment()

// 快速测试
quickAPITest()

// 完整测试
testVirtualPetAPIDiscovery()
```

### 3. 手动测试特定端点

```javascript
// 测试特定端点
fetch('/api/openai/models')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## 💡 优势和改进

### 相比之前版本的改进

1. **更准确的端点** - 基于SillyTavern实际架构
2. **更好的分组** - 按提供商组织API
3. **更智能的配置** - 自动填充和建议
4. **更详细的日志** - 便于调试和问题定位
5. **更好的错误处理** - 优雅处理各种异常情况

### 兼容性考虑

- 支持不同版本的SillyTavern
- 向后兼容旧的API格式
- 优雅降级处理

## 🔮 预期效果

使用重新设计的API发现功能，用户应该能够：

1. **自动发现** SillyTavern中配置的API
2. **智能识别** 不同类型的API和模型
3. **快速配置** 检测到的API
4. **轻松调试** 遇到的问题

## 📝 测试建议

1. **在SillyTavern中先配置一个API** - 确保有可检测的内容
2. **运行环境诊断** - 确认环境正确
3. **查看详细日志** - 了解检测过程
4. **测试UI交互** - 验证下拉列表和配置功能

这个重新设计的版本应该能够更准确地从SillyTavern获取API信息，提供更好的用户体验。
