@echo off
title Personal Expense Tracker - React Frontend
echo ========================================================
echo  Starting React.js Frontend on http://localhost:3000
echo ========================================================
cd /d "%~dp0frontend"
npm.cmd run dev
pause
