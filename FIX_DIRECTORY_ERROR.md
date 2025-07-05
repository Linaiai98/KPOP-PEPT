# 🔧 修复"Directory already exists"错误

## 问题描述

当你删除虚拟宠物系统插件后重新安装时，可能会遇到黄色警告框显示：
```
Extension installation failed
Directory already exists at public/scripts/extensions/third-party/KPCP-PET
```

## 🚀 快速解决方案

### 方案一：使用自动清理脚本（推荐）

**Windows用户**：
1. 双击运行 `cleanup_plugin.bat` 文件
2. 按照提示操作
3. 重启SillyTavern
4. 重新安装插件

**Linux/Mac用户**：
1. 在终端中运行：
   ```bash
   chmod +x cleanup_plugin.sh
   ./cleanup_plugin.sh
   ```
2. 按照提示操作
3. 重启SillyTavern
4. 重新安装插件

### 方案二：手动删除目录

**Windows用户**：
1. 找到你的SillyTavern安装目录
2. 导航到 `public\scripts\extensions\third-party\`
3. 删除以下文件夹（如果存在）：
   - `KPCP-PET`
   - `virtual-pet-system`
   - `pet-system`
4. 重启SillyTavern
5. 重新安装插件

**Linux/Mac用户**：
1. 打开终端
2. 导航到SillyTavern目录：
   ```bash
   cd /path/to/your/SillyTavern
   ```
3. 删除插件目录：
   ```bash
   rm -rf public/scripts/extensions/third-party/KPCP-PET
   rm -rf public/scripts/extensions/third-party/virtual-pet-system
   rm -rf public/scripts/extensions/third-party/pet-system
   ```
4. 重启SillyTavern
5. 重新安装插件

### 方案三：使用浏览器控制台

1. 在SillyTavern页面按F12打开开发者工具
2. 切换到"Console"标签
3. 输入以下代码并按回车：
   ```javascript
   // 自动清理插件残留
   cleanupVirtualPetSystem(false);
   ```
4. 如果上述函数不存在，使用手动清理：
   ```javascript
   // 手动清理DOM元素
   $('#virtual-pet-button').remove();
   $('.virtual-pet-popup-overlay').remove();
   $('#virtual-pet-popup-overlay').remove();
   console.log('✅ 清理完成');
   ```

## 🔍 验证清理结果

清理完成后，验证是否成功：

1. **检查文件系统**：
   确认 `public/scripts/extensions/third-party/` 目录下没有以下文件夹：
   - `KPCP-PET`
   - `virtual-pet-system`
   - `pet-system`

2. **检查浏览器**：
   在控制台运行：
   ```javascript
   console.log('虚拟宠物按钮:', $('#virtual-pet-button').length);
   console.log('虚拟宠物弹窗:', $('.virtual-pet-popup-overlay').length);
   ```
   如果都返回0，说明清理成功。

## 🔄 重新安装步骤

1. **完全关闭SillyTavern**（包括所有标签页）
2. **重新启动SillyTavern**
3. **进入扩展管理页面**
4. **重新安装插件**：
   - 通过URL安装
   - 或上传插件文件
5. **启用插件**

## ⚠️ 预防措施

为了避免将来再次出现此问题：

1. **正确卸载插件**：
   - 先在扩展设置中禁用插件
   - 等待几秒钟让系统清理
   - 再删除插件文件

2. **使用新版本插件**：
   - v1.0.1及以上版本包含自动清理功能
   - 禁用插件时会自动清理相关元素

3. **定期清理**：
   - 定期检查 `third-party` 目录
   - 删除不需要的插件文件夹

## 🆘 仍然无法解决？

如果上述方法都无法解决问题：

1. **检查权限**：
   - Windows：以管理员身份运行清理脚本
   - Linux/Mac：使用sudo权限

2. **完全重置**：
   ```bash
   # 备份重要数据后，删除整个third-party目录
   rm -rf public/scripts/extensions/third-party
   mkdir public/scripts/extensions/third-party
   ```

3. **联系支持**：
   - 在GitHub Issues中报告问题
   - 提供详细的错误信息和操作系统信息

## 📝 常见错误信息

| 错误信息 | 解决方案 |
|---------|---------|
| `Directory already exists at ...KPCP-PET` | 删除KPCP-PET目录 |
| `Directory already exists at ...virtual-pet-system` | 删除virtual-pet-system目录 |
| `Permission denied` | 以管理员/sudo权限运行 |
| `File is being used by another process` | 完全关闭SillyTavern后重试 |

---

**💡 提示**：如果你经常需要重装插件，建议使用Git方式安装，这样可以更方便地管理版本和更新。
