# 虚拟宠物系统 - 安装故障排除专用指南

## 🚨 重装失败问题解决方案

### 问题描述
用户在删除插件重装时遇到黄色框报错：
```
Extension installation failed
Directory already exists at public/scripts/extensions/third-party/KPCP-PET
```

### 根本原因
SillyTavern的扩展管理器在删除插件时，有时不会完全清理目录结构，导致重新安装时发生冲突。

## 🔧 解决步骤

### 步骤1：完全关闭SillyTavern
- 关闭所有SillyTavern窗口/标签页
- 如果是桌面版，确保进程完全退出

### 步骤2：手动清理插件目录

#### Windows用户：
1. 打开文件资源管理器
2. 导航到SillyTavern安装目录
3. 进入路径：`SillyTavern\public\scripts\extensions\third-party\`
4. 查找并删除以下文件夹（如果存在）：
   - `KPCP-PET`
   - `virtual-pet-system`
   - `pet-system`
   - 任何其他相关的宠物系统文件夹

#### Linux/Mac用户：
```bash
# 导航到SillyTavern目录
cd /path/to/your/SillyTavern

# 删除可能的残留目录
rm -rf public/scripts/extensions/third-party/KPCP-PET
rm -rf public/scripts/extensions/third-party/virtual-pet-system
rm -rf public/scripts/extensions/third-party/pet-system

# 验证删除
ls public/scripts/extensions/third-party/
```

### 步骤3：清理浏览器数据（可选）
如果希望完全重置插件数据：

1. 打开浏览器开发者工具（F12）
2. 进入Console标签
3. 运行以下代码：

```javascript
// 清理所有虚拟宠物相关的localStorage数据
Object.keys(localStorage).forEach(key => {
    if (key.includes('virtual-pet') || 
        key.includes('KPCP-PET') || 
        key.includes('pet-system')) {
        localStorage.removeItem(key);
        console.log('已删除:', key);
    }
});
console.log('localStorage清理完成');
```

### 步骤4：重启并重新安装

1. **重启SillyTavern**
2. **进入扩展页面**
3. **重新安装插件**：
   - 点击"Download Extension / Update"
   - 输入仓库地址：`https://github.com/your-username/sillytavern-virtual-pet`
   - 点击Download

## 🛡️ 预防措施

### 正确的卸载流程：
1. 在扩展设置中**先禁用**插件
2. 等待3-5秒
3. 刷新页面确认插件已禁用
4. 再进行删除操作

### 安装最佳实践：
1. 确保SillyTavern版本是最新的
2. 关闭其他不必要的扩展
3. 使用稳定的网络连接
4. 避免在安装过程中切换页面

## 🔍 验证安装成功

安装完成后，检查以下项目：

### 1. 文件结构检查
确认以下文件存在：
```
SillyTavern/public/scripts/extensions/third-party/virtual-pet-system/
├── manifest.json
├── index.js
├── style.css
├── popup.html
├── settings.html
└── README.md
```

### 2. 浏览器控制台检查
打开控制台，应该看到：
```
[virtual-pet-system] Extension loaded successfully.
```

### 3. 扩展设置检查
- 进入SillyTavern扩展设置
- 找到"🐾 虚拟宠物系统"选项
- 确认可以正常启用/禁用

### 4. 功能测试
- 启用插件后应该看到🐾浮动按钮
- 点击按钮应该能打开宠物界面

## 🆘 仍然无法解决？

### 收集诊断信息：
1. SillyTavern版本号
2. 浏览器类型和版本
3. 操作系统信息
4. 完整的控制台错误日志
5. 插件目录的截图

### 运行诊断脚本：
```javascript
// 完整诊断脚本
(function() {
    const info = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        sillyTavernVersion: window.ST_VERSION || 'Unknown',
        jqueryLoaded: typeof jQuery !== 'undefined',
        extensionPath: 'scripts/extensions/third-party/virtual-pet-system/',
        localStorage: {}
    };
    
    // 收集localStorage信息
    Object.keys(localStorage).forEach(key => {
        if (key.includes('virtual-pet') || key.includes('extension')) {
            info.localStorage[key] = localStorage.getItem(key);
        }
    });
    
    // 检查文件访问
    fetch('scripts/extensions/third-party/virtual-pet-system/manifest.json')
        .then(response => {
            info.manifestAccessible = response.ok;
            return response.ok ? response.json() : null;
        })
        .then(manifest => {
            info.manifestContent = manifest;
            console.log('=== 诊断信息 ===');
            console.log(JSON.stringify(info, null, 2));
            console.log('=== 请将以上信息发送给开发者 ===');
        })
        .catch(error => {
            info.manifestError = error.message;
            console.log('=== 诊断信息 ===');
            console.log(JSON.stringify(info, null, 2));
            console.log('=== 请将以上信息发送给开发者 ===');
        });
})();
```

### 联系支持：
- GitHub Issues: [项目地址]/issues
- 提供完整的诊断信息
- 描述详细的复现步骤

## 📋 常见错误代码

| 错误信息 | 可能原因 | 解决方案 |
|---------|---------|---------|
| Directory already exists | 目录残留 | 手动删除目录 |
| 404 Not Found | 文件缺失 | 重新下载完整文件 |
| Permission denied | 权限问题 | 以管理员身份运行 |
| Network error | 网络问题 | 检查网络连接 |
| JSON parse error | 文件损坏 | 重新下载文件 |

## 🔄 自动化解决脚本

对于高级用户，可以使用以下自动化脚本：

```bash
#!/bin/bash
# 自动清理和重装脚本 (Linux/Mac)

SILLYTAVERN_PATH="/path/to/your/SillyTavern"
EXTENSION_PATH="$SILLYTAVERN_PATH/public/scripts/extensions/third-party"

echo "🧹 开始清理虚拟宠物系统..."

# 删除可能的残留目录
rm -rf "$EXTENSION_PATH/KPCP-PET"
rm -rf "$EXTENSION_PATH/virtual-pet-system"
rm -rf "$EXTENSION_PATH/pet-system"

echo "✅ 目录清理完成"

# 重新克隆仓库
cd "$EXTENSION_PATH"
git clone https://github.com/your-username/sillytavern-virtual-pet.git virtual-pet-system

echo "🎉 重新安装完成！请重启SillyTavern。"
```

**注意**：使用前请修改脚本中的路径为你的实际SillyTavern安装路径。
