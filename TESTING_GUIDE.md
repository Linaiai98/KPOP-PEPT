# SillyTavern API发现功能测试指南 (重新设计版本)

## 🔧 重新设计的API发现方法

基于对SillyTavern架构的深入研究，我们重新设计了API发现功能，现在采用以下方法：

### 🎯 新的检测策略

1. **SillyTavern标准API端点** - 直接调用SillyTavern的内部API端点
2. **上下文信息获取** - 通过SillyTavern.getContext()获取当前配置
3. **设置存储检查** - 检查localStorage中的API配置信息

### 📋 测试步骤

#### 1. 环境诊断

首先在SillyTavern的浏览器控制台中运行：

```javascript
// 快速环境诊断
diagnoseSillyTavernEnvironment()
```

这会检查：
- SillyTavern对象是否存在
- 必要的函数是否可用
- 页面环境是否正确
- DOM元素是否存在

#### 2. 快速API测试

```javascript
// 快速API测试
quickAPITest()
```

这会进行：
- 基础对象检查
- 关键API端点测试
- DOM元素快速检查
- API获取尝试

#### 3. 完整API发现测试

```javascript
// 完整的API发现测试
testVirtualPetAPIDiscovery()
```

这会执行完整的API发现流程，包括：
- 所有SillyTavern API端点扫描
- 上下文信息提取
- 设置存储分析

### 4. 手动刷新测试

1. 打开虚拟宠物设置面板
2. 找到"🤖 AI API 配置"部分
3. 点击"🔄 刷新"按钮
4. 观察控制台输出和下拉列表变化

## 🔍 问题诊断

### 如果没有检测到任何API

**可能原因：**

1. **SillyTavern版本问题**
   - 检查SillyTavern版本是否支持相关API
   - 尝试更新到最新版本

2. **API未配置**
   - 确认SillyTavern中已经配置了至少一个API
   - 检查API配置是否正确

3. **权限问题**
   - 检查浏览器是否阻止了某些请求
   - 查看浏览器开发者工具的网络选项卡

4. **插件加载时机**
   - 确认插件在SillyTavern完全加载后才运行
   - 尝试刷新页面后重新测试

### 常见错误信息

#### "SillyTavern对象不存在"
- 确认你在SillyTavern页面中运行测试
- 检查页面是否完全加载
- 尝试等待几秒后重新运行

#### "端点访问失败"
- 这是正常的，不是所有端点都会存在
- 关注是否有任何端点返回成功

#### "未发现任何API"
- 检查SillyTavern的API配置页面
- 确认至少配置了一个可用的API
- 查看SillyTavern的连接状态

## 🛠️ 调试技巧

### 1. 查看详细日志

所有测试函数都会输出详细的控制台日志，包括：
- 检查过程的每一步
- 发现的数据内容
- 错误信息和警告

### 2. 检查网络请求

打开浏览器开发者工具的"网络"选项卡：
- 查看是否有API请求被发送
- 检查请求的响应状态
- 查看响应内容

### 3. 手动检查SillyTavern状态

```javascript
// 检查SillyTavern上下文
if (typeof SillyTavern !== 'undefined' && SillyTavern.getContext) {
    console.log(SillyTavern.getContext());
}

// 检查全局变量
console.log('main_api:', window.main_api);
console.log('api_server:', window.api_server);
```

### 4. 检查DOM元素

```javascript
// 查找API相关的DOM元素
console.log('API按钮:', $('#api_button').length);
console.log('选择框:', $('select').length);
console.log('包含API的元素:', $('[id*="api"], [class*="api"]').length);
```

## 📋 测试清单

- [ ] 确认在SillyTavern页面中测试
- [ ] 运行 `diagnoseSillyTavernEnvironment()`
- [ ] 运行 `quickAPITest()`
- [ ] 运行 `testVirtualPetAPIDiscovery()`
- [ ] 测试UI刷新按钮
- [ ] 检查控制台日志
- [ ] 检查网络请求
- [ ] 验证SillyTavern API配置

## 🔄 如果仍然无法获取API

### 备选方案1：手动配置
如果自动发现失败，你仍然可以：
1. 手动选择API类型
2. 输入API URL和密钥
3. 使用测试连接功能验证

### 备选方案2：检查SillyTavern配置
1. 打开SillyTavern的API设置页面
2. 确认已配置并连接了API
3. 记录API类型和模型名称
4. 在插件中手动输入这些信息

### 备选方案3：版本兼容性
如果是版本兼容性问题：
1. 查看SillyTavern的版本信息
2. 检查是否有API结构变化
3. 考虑更新SillyTavern或插件

## 📞 获取帮助

如果测试后仍有问题，请提供：
1. `diagnoseSillyTavernEnvironment()` 的完整输出
2. `quickAPITest()` 的完整输出
3. SillyTavern版本信息
4. 浏览器控制台的错误信息
5. 网络请求的详细信息

这些信息将帮助快速定位和解决问题。
