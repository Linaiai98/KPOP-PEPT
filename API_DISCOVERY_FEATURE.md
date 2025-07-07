# API发现功能说明

## 🔍 功能概述

虚拟宠物系统现在支持智能发现SillyTavern中可用的API和模型，无需手动输入API信息。

## 🚀 新增功能

### 1. 自动API发现
- **智能扫描**: 自动从SillyTavern获取可用的API列表
- **多源获取**: 支持从多个数据源获取API信息
- **实时更新**: 可以随时刷新获取最新的API状态

### 2. 增强的用户界面
- **刷新按钮**: 在AI配置下拉框旁边添加了"🔄 刷新"按钮
- **状态指示**: 用✅和❓图标显示API的可用状态
- **分组显示**: 将检测到的API与默认选项分组显示

### 3. 智能配置
- **自动填充**: 选择检测到的API时自动填充相关配置
- **模型识别**: 能够识别并显示可用的AI模型
- **类型匹配**: 自动匹配API类型并设置默认参数

## 📋 使用方法

### 基本使用
1. 打开虚拟宠物设置面板
2. 找到"🤖 AI API 配置"部分
3. 点击下拉框旁边的"🔄 刷新"按钮
4. 等待扫描完成，查看检测到的API
5. 选择合适的API并配置相关参数

### 高级调试
在浏览器控制台中运行以下命令进行调试：

```javascript
// 测试API发现功能
testVirtualPetAPIDiscovery()

// 手动获取API列表
getAvailableAPIs().then(console.log)

// 查看SillyTavern上下文
console.log(SillyTavern.getContext())
```

## 🔧 技术实现

### 数据获取方式

#### 1. SillyTavern上下文获取
```javascript
const context = SillyTavern.getContext();
// 获取主要API类型
context.main_api
// 获取在线状态
context.online_status
// 获取API服务器配置
context.api_server
```

#### 2. API端点扫描
扫描以下端点获取API信息：
- `/api/v1/models` - 获取模型列表
- `/api/models` - 备用模型端点
- `/api/backends` - 获取后端配置
- `/api/status` - 获取状态信息
- `/api/config` - 获取配置信息

#### 3. 数据处理
- **去重**: 自动去除重复的API条目
- **排序**: 按名称字母顺序排列
- **分类**: 区分API类型和模型类型
- **状态**: 标记API的可用状态

## 🎯 支持的API类型

### 主流API服务
- **OpenAI**: ChatGPT系列模型
- **Claude**: Anthropic的Claude系列
- **Google AI**: Gemini系列模型
- **Mistral AI**: Mistral系列模型
- **本地服务**: Ollama、KoboldAI、TabbyAPI等

### 检测信息
对于每个检测到的API，显示：
- **名称**: API或模型的名称
- **类型**: API的类别（openai、claude等）
- **状态**: 可用性状态（✅可用、❓未知）
- **来源**: 数据来源（context、/api/models等）

## 🛠️ 故障排除

### 常见问题

#### 1. 无法检测到API
**可能原因**:
- SillyTavern版本不兼容
- API端点不可用
- 权限不足

**解决方法**:
- 检查SillyTavern版本
- 在控制台运行调试命令
- 查看浏览器开发者工具的网络选项卡

#### 2. 检测到的API无法使用
**可能原因**:
- API配置不完整
- 密钥未设置
- 网络连接问题

**解决方法**:
- 手动配置API URL和密钥
- 使用"🔗 测试连接"功能验证
- 检查网络连接状态

#### 3. 刷新按钮无响应
**可能原因**:
- JavaScript错误
- 网络请求被阻止
- SillyTavern API不可用

**解决方法**:
- 刷新页面重试
- 检查浏览器控制台错误
- 确认SillyTavern正常运行

## 📊 调试信息

### 控制台输出
插件会在控制台输出详细的调试信息：
- API扫描过程
- 检测到的API列表
- 错误信息和警告
- 性能统计

### 日志级别
- `[virtual-pet-system] 开始获取可用API列表...` - 开始扫描
- `[virtual-pet-system] 从 /api/models 获取到数据:` - 成功获取数据
- `[virtual-pet-system] 端点 /api/xxx 不可用:` - 端点不可用
- `[virtual-pet-system] 发现 X 个可用API:` - 扫描完成

## 🔮 未来计划

### 计划中的功能
- **缓存机制**: 缓存API列表以提高性能
- **自动更新**: 定期自动刷新API状态
- **更多数据源**: 支持更多的API信息来源
- **配置导入**: 从SillyTavern直接导入API配置
- **健康检查**: 定期检查API的健康状态

### 兼容性改进
- **版本适配**: 适配不同版本的SillyTavern
- **错误恢复**: 更好的错误处理和恢复机制
- **性能优化**: 减少API扫描的性能影响

## 📝 更新日志

### v1.0.1 (当前版本)
- ✅ 添加API自动发现功能
- ✅ 新增刷新按钮UI
- ✅ 支持多种数据源
- ✅ 添加调试功能
- ✅ 改进错误处理

---

💡 **提示**: 如果遇到问题，请先尝试在控制台运行 `testVirtualPetAPIDiscovery()` 进行诊断。
