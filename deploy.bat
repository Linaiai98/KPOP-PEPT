@echo off
echo 🚀 虚拟宠物中继服务器部署脚本
echo ================================

echo 📁 创建项目目录...
if not exist "C:\virtual-pet-relay" mkdir C:\virtual-pet-relay
cd C:\virtual-pet-relay

echo 📦 检查Node.js安装...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js未安装，请先安装Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js已安装
node --version
npm --version

echo 📥 安装项目依赖...
npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

echo 🔥 启动服务器...
echo 选择启动方式:
echo 1. 直接启动 (测试用)
echo 2. PM2启动 (生产环境推荐)
set /p choice=请选择 (1 或 2): 

if "%choice%"=="1" (
    echo 🚀 直接启动服务器...
    npm start
) else if "%choice%"=="2" (
    echo 📦 安装PM2...
    npm install -g pm2
    
    echo 🚀 使用PM2启动服务器...
    pm2 start relay-server.js --name "virtual-pet-relay"
    pm2 startup
    pm2 save
    
    echo ✅ 服务器已启动并设置为开机自启
    pm2 status
) else (
    echo ❌ 无效选择
    pause
    exit /b 1
)

echo.
echo 🎉 部署完成！
echo 📡 本地访问: http://localhost:3000/health
echo 🌐 公网访问: http://154.12.38.33:3000/health
echo.
echo 💡 管理命令:
echo   pm2 status          - 查看状态
echo   pm2 logs            - 查看日志
echo   pm2 restart all     - 重启服务
echo   pm2 stop all        - 停止服务
echo.
pause
