@echo off
title Stop Personal Expense Tracker
echo ========================================================
echo  Stopping Servers on Port 8081 (Backend) and 3000 (Frontend)...
echo ========================================================

:: Stop port 8081 (Spring Boot)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081 ^| findstr LISTENING 2^>nul') do (
    echo Stopping Backend (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

:: Stop port 3000 (React Vite)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING 2^>nul') do (
    echo Stopping Frontend (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo Both servers have been stopped!
timeout /t 3 >nul
exit
