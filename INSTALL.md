# 虚拟宠物系统 - 安装指南

## 📦 快速安装

### 方法一：通过SillyTavern扩展管理器（推荐）

1. **打开SillyTavern**
   - 启动你的SillyTavern应用

2. **进入扩展页面**
   - 点击右上角的扩展图标 🎲
   - 或者点击菜单中的"Extensions"

3. **下载扩展**
   - 点击"Download Extension / Update"按钮
   - 在输入框中粘贴仓库地址：
     ```
     https://github.com/your-username/sillytavern-virtual-pet
     ```
   - 点击"Download"按钮

4. **启用扩展**
   - 下载完成后，在扩展列表中找到"虚拟宠物系统"
   - 勾选启用选项
   - 如果需要，重新加载UI

### 方法二：手动安装

1. **下载文件**
   - 下载本项目的所有文件
   - 或者克隆仓库：`git clone https://github.com/your-username/sillytavern-virtual-pet.git`

2. **复制到扩展目录**
   - 找到你的SillyTavern安装目录
   - 导航到：`SillyTavern/public/scripts/extensions/third-party/`
   - 创建文件夹：`virtual-pet-system`
   - 将所有文件复制到该文件夹中

3. **文件结构确认**
   ```
   SillyTavern/
   └── public/
       └── scripts/
           └── extensions/
               └── third-party/
                   └── virtual-pet-system/
                       ├── manifest.json
                       ├── index.js
                       ├── style.css
                       ├── popup.html
                       ├── settings.html
                       └── README.md
   ```

4. **重启SillyTavern**
   - 完全关闭SillyTavern
   - 重新启动应用

5. **启用扩展**
   - 进入扩展设置页面
   - 找到"虚拟宠物系统"
   - 勾选启用选项

## ✅ 安装验证

安装成功后，你应该能看到：

1. **扩展设置**
   - 在扩展设置页面看到"🐾 虚拟宠物系统"选项
   - 可以勾选"启用虚拟宠物系统"

2. **浮动按钮**
   - 启用后，屏幕上出现一个🐾浮动按钮
   - 按钮可以拖拽移动
   - 点击按钮打开宠物界面

3. **宠物界面**
   - 弹窗正确显示
   - 宠物状态条正常显示
   - 互动按钮可以点击

## 🔧 故障排除

### 插件不显示

**问题**：扩展列表中没有看到虚拟宠物系统

**解决方案**：
1. 检查文件路径是否正确
2. 确认`manifest.json`文件存在且格式正确
3. 重启SillyTavern
4. 检查浏览器控制台是否有错误信息

### 浮动按钮不出现

**问题**：启用插件后没有看到🐾按钮

**解决方案**：
1. 确认插件已正确启用
2. 刷新页面或重启SillyTavern
3. 检查浏览器控制台错误
4. 确认CSS文件正确加载

### 功能不正常

**问题**：按钮点击无反应或功能异常

**解决方案**：
1. 打开浏览器开发者工具（F12）
2. 查看Console标签页的错误信息
3. 确认所有文件都正确复制
4. 检查是否与其他扩展冲突

### 移动端问题

**问题**：在手机或平板上使用异常

**解决方案**：
1. 确认使用现代浏览器
2. 检查触摸事件是否正常
3. 尝试刷新页面
4. 检查屏幕尺寸适配

## 📱 兼容性

### 支持的浏览器
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### 支持的设备
- ✅ 桌面电脑
- ✅ 笔记本电脑
- ✅ 平板电脑
- ✅ 智能手机

### SillyTavern版本
- ✅ SillyTavern 1.10.0+
- ✅ 最新开发版本

## 🔄 更新插件

### 通过扩展管理器更新
1. 进入扩展页面
2. 点击"Download Extension / Update"
3. 输入相同的仓库地址
4. 点击"Download"覆盖安装

### 手动更新
1. 下载最新版本文件
2. 替换原有文件
3. 重启SillyTavern

## 🗑️ 卸载插件

### 通过扩展管理器
1. 在扩展列表中找到插件
2. 取消勾选启用选项
3. 删除扩展文件夹（可选）

### 手动卸载
1. 删除`virtual-pet-system`文件夹
2. 重启SillyTavern
3. 清理浏览器localStorage（可选）

## 💾 数据备份

插件数据存储在浏览器的localStorage中，包括：
- 宠物状态数据
- 用户设置
- 按钮位置

**备份方法**：
1. 打开浏览器开发者工具
2. 进入Application/Storage标签
3. 找到localStorage项目
4. 导出相关数据

**恢复方法**：
1. 在localStorage中恢复数据
2. 或者重新开始养宠物

## 📞 获取帮助

如果遇到问题：

1. **查看文档**
   - 阅读README.md
   - 查看TESTING.md测试指南

2. **检查日志**
   - 打开浏览器控制台
   - 查看错误信息

3. **社区支持**
   - 在GitHub Issues中提问
   - 提供详细的错误信息和环境描述

4. **联系开发者**
   - 通过GitHub联系
   - 提供复现步骤和截图
