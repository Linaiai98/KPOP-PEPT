# 虚拟宠物系统 - 故障排除指南

## 🚨 插件重装失败问题

### 问题：删除插件重装时出现黄色框报错

**错误信息**：
```
Extension installation failed
Directory already exists at public/scripts/extensions/third-party/KPCP-PET
```

**原因分析**：
- SillyTavern的插件删除功能有时不会完全清理目录
- 残留的文件夹阻止了重新安装
- 这是SillyTavern扩展管理器的已知问题

**解决方案**：

#### 方法一：手动删除残留目录（推荐）

1. **关闭SillyTavern**
2. **找到SillyTavern安装目录**
   - 通常在：`SillyTavern/public/scripts/extensions/third-party/`
3. **手动删除插件文件夹**
   - 删除 `KPCP-PET` 或 `virtual-pet-system` 文件夹
   - 确保文件夹完全删除
4. **重启SillyTavern**
5. **重新安装插件**

#### 方法二：使用文件管理器清理

**Windows用户**：
1. 按 `Win + R` 打开运行对话框
2. 输入 `%USERPROFILE%` 或导航到SillyTavern目录
3. 找到 `SillyTavern\public\scripts\extensions\third-party\`
4. 删除对应的插件文件夹
5. 重启SillyTavern后重新安装

**Linux/Mac用户**：
```bash
# 导航到SillyTavern目录
cd /path/to/SillyTavern
# 删除插件目录
rm -rf public/scripts/extensions/third-party/KPCP-PET
# 或者
rm -rf public/scripts/extensions/third-party/virtual-pet-system
```

#### 方法三：清理所有第三方插件（谨慎使用）

如果有多个插件安装问题：
1. 备份重要的插件设置
2. 删除整个 `third-party` 文件夹
3. 重启SillyTavern
4. 重新安装所需的插件

**注意**：这会删除所有第三方插件，请谨慎使用！

### 预防措施

1. **正确卸载插件**：
   - 先在扩展设置中禁用插件
   - 等待几秒钟
   - 再进行删除操作

2. **定期清理**：
   - 定期检查 `third-party` 目录
   - 删除不需要的插件文件夹

3. **使用Git安装**（高级用户）：
   ```bash
   cd SillyTavern/public/scripts/extensions/third-party/
   git clone https://github.com/your-repo/virtual-pet-system.git
   ```

## 🔍 悬浮窗不显示的排查步骤

### 第一步：检查文件结构

确保文件夹结构正确：
```
SillyTavern/
└── public/
    └── scripts/
        └── extensions/
            └── third-party/
                └── virtual-pet-system/  ← 文件夹名必须是这个
                    ├── manifest.json
                    ├── index.js
                    ├── style.css
                    ├── popup.html
                    ├── settings.html
                    └── README.md
```

**重要**：文件夹名必须是 `virtual-pet-system`，不能是其他名称！

### 第二步：检查浏览器控制台

1. 打开SillyTavern
2. 按F12打开开发者工具
3. 点击"Console"标签
4. 刷新页面
5. 查找以下信息：

**正常情况下应该看到：**
```
[virtual-pet-system] Starting initialization...
[virtual-pet-system] Initializing extension...
[virtual-pet-system] Loading CSS from: scripts/extensions/third-party/virtual-pet-system/style.css
[virtual-pet-system] Loading HTML files...
[virtual-pet-system] HTML files loaded successfully
[virtual-pet-system] Setting up initial state...
[virtual-pet-system] Extension enabled: true
[virtual-pet-system] Toggle element found and set
[virtual-pet-system] Initializing floating button...
[virtual-pet-system] initializeFloatingButton called
[virtual-pet-system] Creating floating button with ID: virtual-pet-button
[virtual-pet-system] Button created, element count: 1
[virtual-pet-system] Button set to default position
[virtual-pet-system] Button initialization complete
[virtual-pet-system] Extension loaded successfully.
```

### 第三步：常见错误及解决方案

#### 错误1：找不到HTML文件
```
[virtual-pet-system] Failed to load HTML files. Error: 404
```
**解决方案**：
- 检查文件夹名称是否为 `virtual-pet-system`
- 确认 `settings.html` 和 `popup.html` 文件存在
- 重启SillyTavern

#### 错误2：Toggle element not found
```
[virtual-pet-system] Toggle element not found: #virtual-pet-enabled-toggle
```
**解决方案**：
- settings.html文件没有正确加载
- 检查SillyTavern版本兼容性
- 手动刷新扩展设置页面

#### 错误3：Button created, element count: 0
```
[virtual-pet-system] Button created, element count: 0
```
**解决方案**：
- CSS样式冲突
- 检查是否有其他扩展干扰
- 尝试禁用其他扩展

### 第四步：手动启用插件

如果自动启用失败，尝试手动启用：

1. 进入SillyTavern扩展设置页面
2. 找到"虚拟宠物系统"选项
3. 手动勾选启用
4. 刷新页面

### 第五步：强制显示按钮

如果仍然不显示，在浏览器控制台中运行以下代码：

```javascript
// 检查插件是否加载
console.log('jQuery loaded:', typeof jQuery !== 'undefined');
console.log('Body element:', $('body').length);

// 手动创建按钮进行测试
$('body').append(`
<div id="virtual-pet-button-test" style="
    position: fixed;
    top: 50%;
    left: 20px;
    width: 56px;
    height: 56px;
    background: #7289da;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 28px;
    z-index: 999999;
    cursor: pointer;
">🐾</div>
`);

// 检查按钮是否创建成功
console.log('Test button created:', $('#virtual-pet-button-test').length);
```

### 第六步：检查CSS加载

在控制台运行：
```javascript
// 检查CSS是否加载
const cssLoaded = Array.from(document.styleSheets).some(sheet => 
    sheet.href && sheet.href.includes('virtual-pet-system')
);
console.log('CSS loaded:', cssLoaded);
```

### 第七步：检查扩展设置

1. 进入SillyTavern设置页面
2. 找到扩展设置区域
3. 确认看到"🐾 虚拟宠物系统"选项
4. 如果没有看到，说明插件没有正确加载

## 🔧 其他常见问题

### 问题：插件加载但功能不工作

**排查步骤**：
1. 检查localStorage是否可用
2. 确认没有JavaScript错误
3. 检查SillyTavern版本兼容性

### 问题：移动端显示异常

**排查步骤**：
1. 检查CSS媒体查询
2. 确认触摸事件正常
3. 测试不同屏幕尺寸

### 问题：与其他扩展冲突

**排查步骤**：
1. 禁用其他扩展逐一测试
2. 检查CSS选择器冲突
3. 查看JavaScript错误

## 📞 获取更多帮助

如果以上步骤都无法解决问题：

1. **收集信息**：
   - SillyTavern版本
   - 浏览器类型和版本
   - 控制台完整错误信息
   - 文件夹结构截图

2. **联系支持**：
   - 在GitHub Issues中提交问题
   - 提供详细的复现步骤
   - 附上控制台日志

## 🚀 快速修复命令

### 自动诊断脚本

在浏览器控制台中运行以下命令进行快速诊断：

```javascript
// 完整诊断脚本
(function() {
    console.log('=== 虚拟宠物系统诊断 ===');
    console.log('jQuery:', typeof jQuery !== 'undefined');
    console.log('Body element:', $('body').length);
    console.log('Extensions settings:', $('#extensions_settings2').length);
    console.log('Virtual pet toggle:', $('#virtual-pet-enabled-toggle').length);
    console.log('Virtual pet button:', $('#virtual-pet-button').length);
    console.log('LocalStorage available:', typeof localStorage !== 'undefined');

    // 检查CSS
    const cssLoaded = Array.from(document.styleSheets).some(sheet =>
        sheet.href && sheet.href.includes('virtual-pet-system')
    );
    console.log('CSS loaded:', cssLoaded);

    // 检查存储的设置
    const enabled = localStorage.getItem('virtual-pet-enabled');
    console.log('Extension enabled in storage:', enabled);

    console.log('=== 诊断完成 ===');
})();
```

### 插件重装问题检测脚本

```javascript
// 检测插件安装问题
(function() {
    console.log('=== 插件安装问题检测 ===');

    // 检查可能的残留目录
    const possiblePaths = [
        'scripts/extensions/third-party/KPCP-PET',
        'scripts/extensions/third-party/virtual-pet-system',
        'scripts/extensions/third-party/pet-system'
    ];

    console.log('检查可能的残留目录...');

    // 尝试访问这些路径来检测是否存在
    possiblePaths.forEach(path => {
        fetch(path + '/manifest.json')
            .then(response => {
                if (response.ok) {
                    console.warn(`⚠️ 发现残留目录: ${path}`);
                    console.log(`建议手动删除: SillyTavern/public/${path}`);
                } else {
                    console.log(`✅ 路径清洁: ${path}`);
                }
            })
            .catch(() => {
                console.log(`✅ 路径清洁: ${path}`);
            });
    });

    // 检查localStorage中的残留数据
    const storageKeys = Object.keys(localStorage).filter(key =>
        key.includes('virtual-pet') || key.includes('KPCP-PET')
    );

    if (storageKeys.length > 0) {
        console.log('📦 发现localStorage中的插件数据:');
        storageKeys.forEach(key => console.log(`  - ${key}`));
        console.log('如需完全重置，可运行清理脚本');
    } else {
        console.log('✅ localStorage中无残留数据');
    }

    console.log('=== 检测完成 ===');
})();
```

### 强制清理脚本（谨慎使用）

```javascript
// 强制清理所有插件数据（谨慎使用！）
function forceCleanupPlugin() {
    const confirmed = confirm(
        '⚠️ 警告：这将删除所有虚拟宠物系统的数据！\n' +
        '包括：宠物状态、设置、头像等\n' +
        '确定要继续吗？'
    );

    if (!confirmed) {
        console.log('❌ 用户取消了清理操作');
        return;
    }

    console.log('🧹 开始强制清理...');

    // 清理localStorage
    const keysToRemove = Object.keys(localStorage).filter(key =>
        key.includes('virtual-pet') ||
        key.includes('KPCP-PET') ||
        key.includes('pet-system')
    );

    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log(`🗑️ 已删除: ${key}`);
    });

    // 清理DOM元素
    $('#virtual-pet-button').remove();
    $('.virtual-pet-popup-overlay').remove();
    $('#virtual-pet-popup-overlay').remove();

    console.log('✅ 清理完成！');
    console.log('📝 建议步骤：');
    console.log('1. 手动删除插件目录');
    console.log('2. 重启SillyTavern');
    console.log('3. 重新安装插件');

    alert('清理完成！请按照控制台提示完成后续步骤。');
}

// 运行清理（取消注释下面这行来执行）
// forceCleanupPlugin();
```

### 一键修复脚本

```javascript
// 一键尝试修复常见问题
function quickFix() {
    console.log('🔧 开始一键修复...');

    try {
        // 1. 重新加载CSS
        const cssLink = document.querySelector('link[href*="virtual-pet-system"]');
        if (cssLink) {
            const newLink = cssLink.cloneNode();
            newLink.href = cssLink.href + '?t=' + Date.now();
            cssLink.parentNode.replaceChild(newLink, cssLink);
            console.log('✅ CSS已重新加载');
        }

        // 2. 重新创建按钮
        if ($('#virtual-pet-button').length === 0) {
            if (typeof window.createPetButton === 'function') {
                window.createPetButton();
                console.log('✅ 按钮已重新创建');
            }
        }

        // 3. 检查并修复设置
        const enabled = localStorage.getItem('virtual-pet-enabled');
        if (enabled === null) {
            localStorage.setItem('virtual-pet-enabled', 'true');
            console.log('✅ 已启用插件设置');
        }

        // 4. 刷新扩展设置UI
        if ($('#virtual-pet-enabled-toggle').length > 0) {
            $('#virtual-pet-enabled-toggle').prop('checked', enabled !== 'false');
            console.log('✅ 设置UI已同步');
        }

        console.log('🎉 一键修复完成！');

    } catch (error) {
        console.error('❌ 修复过程中出现错误:', error);
        console.log('建议手动排查或联系开发者');
    }
}

// 运行一键修复
quickFix();
```

运行后将结果发送给开发者以获得更精确的帮助。
