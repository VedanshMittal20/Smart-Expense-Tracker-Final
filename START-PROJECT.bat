@echo off
title Launch Personal Expense Tracker
echo ========================================================
echo  Launching Personal Expense Tracker (Full Stack)
echo ========================================================
echo [1/3] Starting Spring Boot Backend (Port 8081)...
start "Spring Boot Backend" "%~dp0run-backend.bat"

echo [2/3] Starting React Frontend (Port 3000)...
start "React Frontend" "%~dp0run-frontend.bat"

echo [3/3] Waiting 6 seconds for servers to start...
timeout /t 6 /nobreak >nul

echo Opening browser at http://localhost:3000...
start http://localhost:3000

echo All set! Keep the two terminal windows running in the background.
exit
