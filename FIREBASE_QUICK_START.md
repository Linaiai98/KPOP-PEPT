# 🔥 Firebase 云端备份快速开始

## 📱 简化UI界面

Firebase云端备份现在使用更简洁的界面，所有功能都集中在一个紧凑的区域内：

### 📱 未连接状态
```
☁️ 云端备份
┌─────────────────────────────────────┐
│ ⚪ 未连接              [🔗 连接]    │
│                                     │
│ [输入连接码] [连接]                 │
└─────────────────────────────────────┘
```

### 🟢 已连接状态（主设备视图）
```
☁️ 云端备份
┌─────────────────────────────────────┐
│ 🟢 已连接            [✅ 已连接]    │
│                                     │
│ [🔑 生成连接码] [☁️ 备份]          │
│                                     │
│ 🔑 连接码（分享给其他设备）         │
│ ┌─────────────┐ [📋 复制]           │
│ │   ABC123    │                     │
│ └─────────────┘                     │
│ ⏰ 有效期5分钟，请尽快使用          │
│                                     │
│ [输入连接码] [连接] ← 其他设备可用   │
│                                     │
│ [📥 恢复] [断开]                    │
└─────────────────────────────────────┘
```

## 🚀 使用流程

### 1️⃣ 主设备设置
1. 点击 **"🔗 连接"** 按钮
2. 等待显示 **"🟢 已连接"**
3. 点击 **"🔑 生成连接码"** 按钮
4. 连接码会显示在绿色边框的输入框中
5. 点击 **"📋 复制"** 按钮复制连接码

### 2️⃣ 从设备连接
1. 在其他设备上打开相同界面
2. 在下方的 **"输入连接码"** 框中粘贴连接码
3. 点击 **"连接"** 按钮
4. 等待数据同步完成

### 3️⃣ 重要说明
- ✅ **连接成功后，所有功能区域都保持可见**
- ✅ **连接码显示框会一直显示，方便分享给其他设备**
- ✅ **输入框也保持可见，其他设备可以随时连接**
- ✅ **一个主设备可以让多个从设备连接**

### 4️⃣ 数据管理
- **☁️ 备份**: 手动备份当前数据到云端
- **📥 恢复**: 从云端恢复数据到本地
- **断开**: 断开云端连接

## 🔧 Firebase控制台配置

### ⚠️ 重要：必须配置安全规则

如果遇到权限错误，需要在Firebase控制台配置安全规则：

#### 1. Firestore安全规则
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
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

#### 2. Storage安全规则
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

#### 3. 启用匿名登录
1. Firebase控制台 → Authentication → Sign-in method
2. 启用 **Anonymous** 登录方式

## 🧪 测试工具

- **firebase-simple-test.html** - 简化UI测试页面
- **firebase-test.html** - 完整功能测试页面

## 🔍 故障排除

### 常见问题

**Q: 点击"连接"按钮没有反应？**
A: 检查网络连接，确保能访问Google服务。

**Q: 提示权限错误？**
A: 需要在Firebase控制台配置上述安全规则。

**Q: 连接码在哪里显示？**
A: 点击"生成连接码"后，会在按钮下方显示一个绿色边框的输入框，里面包含6位连接码。

**Q: 如何复制连接码？**
A: 点击连接码旁边的"📋 复制"按钮，或者直接选择输入框中的文字复制。

**Q: 连接成功后为什么还能看到输入框？**
A: 这是正确的设计！连接成功后：
- 连接码显示框保持可见，方便分享给其他设备
- 输入框也保持可见，其他设备可以随时连接
- 一个主设备可以让多个从设备连接

**Q: 连接码多长时间有效？**
A: 连接码有效期为5分钟，过期后需要重新生成。

## 💡 使用技巧

1. **首次使用**: 建议先在测试页面熟悉界面和流程
2. **网络环境**: 在中国大陆可能需要VPN才能访问Firebase服务
3. **移动端**: 建议使用WiFi网络进行数据同步
4. **数据安全**: 连接码只能使用一次，使用后自动失效

## 🎯 界面位置

Firebase云端备份功能位于：
**SillyTavern → 扩展 → 虚拟宠物系统 → ☁️ 云端备份**

现在界面更加简洁，所有功能都在一个紧凑的区域内，使用起来更加直观！🚀
