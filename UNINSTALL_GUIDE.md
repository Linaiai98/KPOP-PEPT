# 虚拟宠物系统 - 卸载指南

## 🗑️ 完全卸载插件

为了防止重新安装时出现"Directory already exists"错误，我们提供了多种卸载方法。

### 方法一：自动清理（推荐）

插件现在包含自动清理功能，当你禁用插件时会自动清理相关元素。

1. **禁用插件**：
   - 进入SillyTavern扩展设置
   - 找到"虚拟宠物系统"
   - 取消勾选启用选项
   - 系统会自动清理UI元素

2. **完全清理**（可选）：
   - 打开浏览器开发者工具（F12）
   - 在控制台中输入：
   ```javascript
   cleanupVirtualPetSystem(true)  // 包含数据清理
   ```
   - 或者只清理UI元素：
   ```javascript
   cleanupVirtualPetSystem(false) // 保留宠物数据
   ```

### 方法二：使用清理脚本

我们提供了专门的清理脚本来彻底清理插件文件：

#### Windows用户：
```batch
# 双击运行 cleanup_plugin.bat
# 或在命令行中运行：
cleanup_plugin.bat
```

#### Linux/Mac用户：
```bash
# 给脚本执行权限
chmod +x cleanup_plugin.sh

# 运行清理脚本
./cleanup_plugin.sh
```

### 方法三：手动清理

如果自动方法不起作用，可以手动清理：

#### 1. 删除插件目录

**Windows用户**：
```batch
# 导航到SillyTavern目录
cd "C:\path\to\your\SillyTavern"

# 删除插件目录（可能的名称）
rmdir /s "public\scripts\extensions\third-party\virtual-pet-system"
rmdir /s "public\scripts\extensions\third-party\KPCP-PET"
rmdir /s "public\scripts\extensions\third-party\pet-system"
```

**Linux/Mac用户**：
```bash
# 导航到SillyTavern目录
cd /path/to/your/SillyTavern

# 删除插件目录
rm -rf public/scripts/extensions/third-party/virtual-pet-system
rm -rf public/scripts/extensions/third-party/KPCP-PET
rm -rf public/scripts/extensions/third-party/pet-system
```

#### 2. 清理浏览器数据（可选）

如果你想完全重置，包括宠物数据：

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
console.log('✅ localStorage清理完成');
```

## 🔍 验证清理结果

清理完成后，验证是否成功：

### 1. 检查文件系统
确认以下目录已被删除：
- `SillyTavern/public/scripts/extensions/third-party/virtual-pet-system`
- `SillyTavern/public/scripts/extensions/third-party/KPCP-PET`
- `SillyTavern/public/scripts/extensions/third-party/pet-system`

### 2. 检查浏览器
在开发者工具控制台中运行：
```javascript
// 检查DOM元素
console.log('虚拟宠物按钮:', $('#virtual-pet-button').length);
console.log('虚拟宠物弹窗:', $('.virtual-pet-popup-overlay').length);

// 检查localStorage
const petKeys = Object.keys(localStorage).filter(key => 
    key.includes('virtual-pet') || key.includes('KPCP-PET')
);
console.log('剩余数据项:', petKeys.length, petKeys);
```

如果返回的数量都是0，说明清理成功。

## 🔄 重新安装

清理完成后，重新安装插件：

1. **重启SillyTavern**
2. **进入扩展页面**
3. **重新安装插件**：
   - 通过URL安装
   - 或上传插件文件
4. **启用插件**

## ⚠️ 常见问题

### Q: 仍然出现"Directory already exists"错误
**A**: 
1. 确保完全关闭SillyTavern
2. 手动检查并删除所有可能的插件目录
3. 重启SillyTavern后再安装

### Q: 清理后数据丢失
**A**: 
- 如果你想保留宠物数据，使用 `cleanupVirtualPetSystem(false)`
- 或者在清理前备份localStorage数据

### Q: 清理脚本无法运行
**A**: 
1. 确保有足够的文件系统权限
2. 在Windows上可能需要以管理员身份运行
3. 在Linux/Mac上可能需要sudo权限

## 📞 获取帮助

如果遇到问题：

1. **检查控制台错误**：打开F12查看错误信息
2. **尝试不同的清理方法**：自动→脚本→手动
3. **联系支持**：在GitHub Issues中报告问题

## 📝 更新日志

### v1.0.1
- ✨ 新增自动卸载清理功能
- 🛠️ 改进插件禁用时的清理逻辑
- 📚 完善卸载指南文档
- 🔧 修复重装时的目录冲突问题
