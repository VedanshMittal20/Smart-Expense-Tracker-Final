@echo off
title Personal Expense Tracker - Spring Boot Backend
echo ========================================================
echo  Starting Spring Boot REST Backend on http://localhost:8081
echo ========================================================
cd /d "%~dp0backend"
if exist "target\backend-0.0.1-SNAPSHOT.jar" (
    java -jar target\backend-0.0.1-SNAPSHOT.jar
) else (
    mvn spring-boot:run
)
pause
