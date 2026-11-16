@echo off
title Personal Expense Tracker - React Frontend
echo ========================================================
echo  Starting React.js Frontend on http://localhost:3000
echo ========================================================
cd /d "%~dp0frontend"

:: Auto-install dependencies on first run if node_modules is missing
if not exist "node_modules\" (
    echo [First Time Run Detected] Installing React dependencies...
    call npm.cmd install
)

call npm.cmd run dev
pause
