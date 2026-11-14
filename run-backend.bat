@echo off
title Personal Expense Tracker - Spring Boot Backend
echo ========================================================
echo  Starting Spring Boot REST Backend on http://localhost:8080
echo ========================================================
cd /d "%~dp0backend"
mvn spring-boot:run
pause
