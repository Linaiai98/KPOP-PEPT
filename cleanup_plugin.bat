@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   虚拟宠物系统 - 插件清理工具
echo ========================================
echo.

REM 设置颜色（如果支持）
if exist "%SystemRoot%\System32\color.exe" (
    color 0A
)

echo 🔍 正在查找SillyTavern安装目录...
echo.

REM 常见的SillyTavern安装路径
set "PATHS[0]=%USERPROFILE%\Desktop\SillyTavern"
set "PATHS[1]=%USERPROFILE%\Documents\SillyTavern"
set "PATHS[2]=%USERPROFILE%\Downloads\SillyTavern"
set "PATHS[3]=C:\SillyTavern"
set "PATHS[4]=D:\SillyTavern"
set "PATHS[5]=%USERPROFILE%\Desktop\写代码\写代码\代码"

set FOUND_PATH=
set INDEX=0

:SEARCH_LOOP
if defined PATHS[%INDEX%] (
    call set "CURRENT_PATH=%%PATHS[%INDEX%]%%"
    if exist "!CURRENT_PATH!\public\scripts\extensions\third-party" (
        set "FOUND_PATH=!CURRENT_PATH!"
        echo ✅ 找到SillyTavern目录: !FOUND_PATH!
        goto :FOUND
    )
    set /a INDEX+=1
    goto :SEARCH_LOOP
)

:NOT_FOUND
echo ❌ 未找到SillyTavern安装目录
echo.
echo 请手动输入SillyTavern的完整路径:
echo 例如: C:\Users\YourName\Desktop\SillyTavern
echo.
set /p "MANUAL_PATH=请输入路径: "

if not exist "%MANUAL_PATH%\public\scripts\extensions\third-party" (
    echo ❌ 输入的路径无效或不是SillyTavern目录
    echo 请确认路径正确后重新运行此脚本
    pause
    exit /b 1
)

set "FOUND_PATH=%MANUAL_PATH%"

:FOUND
setlocal EnableDelayedExpansion
set "EXTENSION_DIR=!FOUND_PATH!\public\scripts\extensions\third-party"

echo.
echo 📂 扩展目录: !EXTENSION_DIR!
echo.

REM 检查需要删除的目录（包含所有可能的名称）
set DIRS_TO_DELETE=
if exist "!EXTENSION_DIR!\KPCP-PET" (
    set "DIRS_TO_DELETE=!DIRS_TO_DELETE! KPCP-PET"
)
if exist "!EXTENSION_DIR!\KPOP-PET" (
    set "DIRS_TO_DELETE=!DIRS_TO_DELETE! KPOP-PET"
)
if exist "!EXTENSION_DIR!\virtual-pet-system" (
    set "DIRS_TO_DELETE=!DIRS_TO_DELETE! virtual-pet-system"
)
if exist "!EXTENSION_DIR!\pet-system" (
    set "DIRS_TO_DELETE=!DIRS_TO_DELETE! pet-system"
)
if exist "!EXTENSION_DIR!\Virtual-Pet-System" (
    set "DIRS_TO_DELETE=!DIRS_TO_DELETE! Virtual-Pet-System"
)

if "!DIRS_TO_DELETE!"=="" (
    echo ✅ 未发现需要清理的插件目录
    echo 所有目录都是干净的！
    echo.
    goto :END
)

echo 🔍 发现以下插件目录:
for %%d in (!DIRS_TO_DELETE!) do (
    echo   - %%d
)
echo.

echo ⚠️  警告: 这将删除上述所有目录及其内容！
echo 删除后你需要重新安装虚拟宠物系统插件。
echo.
set /p "CONFIRM=确定要继续吗？(y/N): "

if /i not "!CONFIRM!"=="y" if /i not "!CONFIRM!"=="yes" (
    echo ❌ 用户取消操作
    goto :END
)

echo.
echo 🧹 开始清理插件目录...
echo.

REM 删除目录
for %%d in (!DIRS_TO_DELETE!) do (
    echo 🗑️  正在删除: %%d
    if exist "!EXTENSION_DIR!\%%d" (
        rmdir /s /q "!EXTENSION_DIR!\%%d" 2>nul
        if exist "!EXTENSION_DIR!\%%d" (
            echo ❌ 删除失败: %%d （可能被占用）
            echo 请关闭SillyTavern后重试
        ) else (
            echo ✅ 删除成功: %%d
        )
    )
)

echo.
echo 🔍 验证清理结果...

set REMAINING=
for %%d in (!DIRS_TO_DELETE!) do (
    if exist "!EXTENSION_DIR!\%%d" (
        set "REMAINING=!REMAINING! %%d"
    )
)

if "!REMAINING!"=="" (
    echo ✅ 所有目录清理完成！
    echo.
    echo 📋 接下来的步骤:
    echo 1. 重启SillyTavern
    echo 2. 进入扩展页面
    echo 3. 重新安装虚拟宠物系统插件
    echo 4. 在扩展设置中启用插件
    echo.
) else (
    echo ❌ 以下目录清理失败:
    for %%d in (!REMAINING!) do (
        echo   - %%d
    )
    echo.
    echo 💡 建议:
    echo 1. 完全关闭SillyTavern（包括所有标签页）
    echo 2. 重新运行此脚本
    echo 3. 或者手动删除这些目录
    echo.
)

:END
echo ========================================
echo 按任意键退出...
pause >nul
