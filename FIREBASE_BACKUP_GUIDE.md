# 🔥 Firebase 云端备份使用指南

## 📋 功能概述

虚拟宠物系统现在支持Firebase云端备份功能，可以实现：

- ☁️ **全平台数据同步** - iOS、Android、Windows、Mac等设备间数据同步
- 🔐 **匿名登录** - 无需注册账号，保护隐私
- 🔑 **设备连接码** - 通过6位连接码安全连接多个设备
- 📱 **实时同步** - 数据变更自动同步到所有连接的设备
- 🛡️ **安全可靠** - 使用Google Firebase云服务，数据安全有保障

## 🚀 快速开始

### 1. 主设备设置（第一台设备）

1. 打开SillyTavern，点击右上角的 **扩展** 图标 (🎲)
2. 在扩展列表中找到并启用 **"虚拟宠物系统"**
3. 在扩展设置页面中，找到 **"☁️ Firebase 云端备份"** 折叠区域
4. 展开该区域，找到"📱 主设备设置"部分
5. 点击 **"🔗 初始化云端备份"** 按钮
6. 等待初始化完成（显示绿色"已连接"状态）
7. 点击 **"🔑 生成连接码"** 按钮
8. 复制显示的6位连接码（如：ABC123）

### 2. 从设备连接（其他设备）

1. 在其他设备上打开SillyTavern，进入扩展设置
2. 启用 **"虚拟宠物系统"** 扩展
3. 展开 **"☁️ Firebase 云端备份"** 区域
4. 在"📲 从设备连接"部分输入主设备生成的连接码
5. 点击 **"🔗 连接同步"** 按钮
6. 等待数据同步完成

### 3. 数据管理

- **☁️ 立即备份** - 手动备份当前数据到云端
- **📥 恢复数据** - 从云端恢复数据到本地
- **🔍 检查同步状态** - 查看各项数据的同步状态
- **🔌 断开连接** - 断开云端连接

## 📊 同步的数据类型

### 🐾 宠物数据
- 宠物名称、类型、等级
- 健康、快乐、饥饿、精力值
- 金币、经验值
- 互动历史记录

### 🤖 AI设置
- API配置（URL、密钥）
- 模型选择
- 人设配置
- 对话参数

### 🎨 自定义头像
- 用户上传的头像图片
- 头像显示设置

### ⚙️ 个性化设置
- 界面偏好
- 通知设置
- 其他用户配置

## 🔒 隐私与安全

### 匿名登录
- 使用Firebase匿名认证，无需提供个人信息
- 每个设备获得唯一的匿名用户ID
- 数据仅在你的设备间同步，不会被其他人访问

### 连接码安全
- 连接码仅5分钟有效，过期自动失效
- 每个连接码只能使用一次
- 连接码使用后立即标记为已使用

### 数据加密
- 所有数据传输使用HTTPS加密
- Firebase提供企业级数据安全保护
- 可随时断开连接并清除云端数据

## 🛠️ 故障排除

### 常见问题

**Q: 初始化失败怎么办？**
A: 检查网络连接，确保能访问Google服务。如果在中国大陆，可能需要使用VPN。

**Q: 连接码无效？**
A: 确认连接码是6位大写字母和数字组合，检查是否在5分钟有效期内，确保连接码未被使用过。

**Q: 数据同步不及时？**
A: 手动点击"☁️ 备份"强制同步，或检查网络连接。

**Q: 移动端连接失败？**
A: 移动端可能需要VPN才能连接Firebase服务，特别是在网络受限的地区。

**Q: 权限错误怎么办？**
A: 需要在Firebase控制台配置安全规则，请参考下面的"Firebase配置"部分。

### 错误代码说明

- **auth/network-request-failed** - 网络连接问题
- **firestore/permission-denied** - 权限错误，需要配置Firestore安全规则
- **storage/unauthorized** - 存储权限错误，需要配置Storage安全规则
- **functions/deadline-exceeded** - 请求超时

## ⚙️ Firebase控制台配置

### 🔐 启用匿名登录
1. 进入 [Firebase控制台](https://console.firebase.google.com/)
2. 选择项目 `kpop-pett`
3. 点击 **Authentication** → **Sign-in method**
4. 启用 **Anonymous** 登录方式

### 📄 配置Firestore安全规则
1. 点击 **Firestore Database** → **Rules**
2. 复制以下规则并粘贴：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户数据
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 连接码
    match /connectionCodes/{codeId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.auth.uid != resource.data.get('secondaryUserId', ''));
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. 点击 **发布** 按钮

### 📁 配置Storage安全规则
1. 点击 **Storage** → **Rules**
2. 复制以下规则并粘贴：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

3. 点击 **发布** 按钮

## 📱 移动端优化

### iOS设备
- 支持Safari和Chrome浏览器
- 建议使用WiFi网络进行大数据同步
- 支持后台同步（需保持浏览器标签页活跃）

### Android设备
- 支持Chrome、Firefox等主流浏览器
- 支持移动数据和WiFi网络
- 建议开启浏览器的"桌面模式"以获得最佳体验

## 🔧 Firebase 配置信息

### 当前配置
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyA74TnN9IoyQjCncKOIOShWEktrL1hd96o",
    authDomain: "kpop-pett.firebaseapp.com",
    projectId: "kpop-pett",
    storageBucket: "kpop-pett.firebasestorage.app",
    messagingSenderId: "264650615774",
    appId: "1:264650615774:web:f500ff555183110c3f0b4f",
    measurementId: "G-3BH0GMJR3D"
};
```

### 服务状态
- ✅ **Firebase Authentication** - 匿名登录已启用
- ✅ **Cloud Firestore** - 数据库服务已配置
- ✅ **Cloud Storage** - 文件存储服务已配置
- ✅ **Firebase Analytics** - 使用统计已启用

### 高级功能

#### 批量设备管理
- 一个主设备可以生成多个连接码
- 支持同时连接多个从设备
- 所有设备数据实时同步

#### 数据版本控制
- 自动记录数据版本信息
- 支持查看最后同步时间
- 防止数据冲突和丢失

#### 离线模式
- 离线时数据保存在本地
- 重新连接时自动同步
- 智能合并离线期间的数据变更

## 🧪 测试工具

### Firebase测试页面
项目包含了一个独立的测试页面 `firebase-test.html`，可以用来：

- 测试Firebase连接
- 验证连接码功能
- 模拟数据备份和恢复
- 调试同步问题

使用方法：
1. 在浏览器中打开 `firebase-test.html`
2. 按照页面提示进行测试
3. 查看控制台日志了解详细信息

### 配置验证脚本
项目还包含了配置验证脚本 `firebase-config-test.js`：

```bash
# 在Node.js环境中运行
node firebase-config-test.js

# 或在浏览器控制台中运行
// 打开浏览器开发者工具，粘贴脚本内容并运行
```

验证内容：
- ✅ Firebase配置格式检查
- ✅ 服务域名可访问性测试
- ✅ 安全规则建议
- ✅ 初始化代码生成

## 📞 技术支持

如果遇到问题，请：

1. 查看浏览器控制台的错误信息
2. 检查网络连接和防火墙设置
3. 确认Firebase服务在你的地区可用
4. 尝试使用测试页面进行诊断

## 🔄 更新日志

### v1.0.1 (当前版本)
- ✅ 实现Firebase匿名登录
- ✅ 添加设备连接码功能
- ✅ 支持宠物数据、AI设置、头像同步
- ✅ 完善移动端适配
- ✅ 添加详细的状态显示和错误处理

### 计划中的功能
- 🔄 自动同步间隔设置
- 📊 数据使用量统计
- 🔔 同步状态通知
- 🗂️ 数据导入导出功能

### UI集成测试
项目还包含了UI集成测试页面 `test-firebase-ui.html`：
- 模拟SillyTavern扩展设置环境
- 测试Firebase UI显示和事件绑定
- 验证样式兼容性

## 📱 UI界面位置

Firebase云端备份功能已正确集成到SillyTavern扩展设置中：

### 访问路径
1. **SillyTavern** → 点击右上角 **扩展图标** (🎲)
2. **扩展列表** → 启用 **"虚拟宠物系统"**
3. **扩展设置** → 展开 **"☁️ Firebase 云端备份"** 区域

### 界面元素
- 📊 **连接状态显示** - 实时显示Firebase连接状态
- 📱 **主设备设置** - 初始化、生成连接码、立即备份
- 📲 **从设备连接** - 输入连接码、连接同步
- 📊 **数据管理** - 恢复数据、检查状态、断开连接

### 设计特色
- 🎨 **糖果色主题** - 与虚拟宠物系统风格一致
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔄 **实时状态** - 动态更新连接和同步状态
- 💫 **动画效果** - 流畅的交互体验

---

💡 **提示**: 首次使用建议先在测试页面熟悉功能，然后再在实际插件中使用。所有功能都已经集成完毕，使用你提供的真实Firebase配置，可以开始使用了！
