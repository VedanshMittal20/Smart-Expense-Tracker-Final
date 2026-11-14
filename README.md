# Personal Expense Tracker & Analytics Platform

A Full-Stack Capstone web application developed with **React.js** and **Spring Boot 3**, featuring full CRUD operations, category-wise expenditure analytics, and JPA database integration.

---

## 🚀 How to Run the Project (Quick Start)

### Option 1: Double-Click Batch Files (Easiest)
1. Double-click `run-backend.bat` (Starts Spring Boot at `http://localhost:8080`).
2. Double-click `run-frontend.bat` (Starts React UI at `http://localhost:3000`).
3. Open your browser to `http://localhost:3000`.

---

### Option 2: Run via Terminal

#### 1. Start Backend (Terminal 1)
```powershell
cd backend
mvn spring-boot:run
```
- Server starts on: `http://localhost:8080`
- Database console (H2): `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:expensedb`
  - Username: `sa`
  - Password: *(leave blank)*

#### 2. Start Frontend (Terminal 2)
```powershell
cd frontend
npm.cmd run dev
```
- Open browser at: `http://localhost:3000`

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, Vite, Custom CSS Design System, Responsive SVG/Progress Analytics
- **Backend:** Spring Boot 3.3.5, Java 21/24, Spring Data JPA, Spring Web (REST)
- **Database:** H2 In-Memory DB (Pre-configured with zero setup; MySQL ready in `application.properties`)
- **Version Control:** Git & GitHub ready

---

## 📋 Viva & Demo Guide
For full viva answers, line-by-line explanation, and examiner walkthrough, refer to `VIVA_GUIDE.md`.
