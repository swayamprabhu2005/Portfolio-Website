@echo off
title Swayam Kiran Prabhu - Portfolio Launch
cd /d "%~dp0"

echo ===================================================
echo   SWAYAM KIRAN PRABHU - PERSONAL PORTFOLIO
echo   Computer Engineering - Software - AI - Systems
echo ===================================================
echo.

if not exist node_modules (
    echo [INFO] Installing required dependencies...
    call npm install
)

echo [INFO] Starting Vite development server...
echo [INFO] Opening http://localhost:5173/ in your browser...
echo.

start "" "http://localhost:5173/"
call npm run dev

pause
