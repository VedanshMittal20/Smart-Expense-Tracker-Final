import React, { useState, useEffect } from 'react';
import { expenseService } from './services/expenseService';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryChart from './components/CategoryChart';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Load all initial data from Spring Boot REST API
  const loadData = async (cat = selectedCategory) => {
    try {
      setLoading(true);
      setApiError(null);
      const [expenseList, summaryData] = await Promise.all([
        expenseService.getAll(cat),
        expenseService.getSummary()
      ]);
      setExpenses(expenseList);
      setSummary(summaryData);
    } catch (err) {
      console.error(err);
      setApiError('Unable to connect to Spring Boot backend (http://localhost:8080). Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedCategory);
  }, [selectedCategory]);

  // Handle Create or Update
  const handleSaveExpense = async (formData) => {
    try {
      if (editingExpense) {
        await expenseService.update(editingExpense.id, formData);
        setEditingExpense(null);
      } else {
        await expenseService.create(formData);
      }
      loadData(selectedCategory);
    } catch (err) {
      alert('Error saving expense: ' + err.message);
    }
  };

  // Handle Delete
  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense record?')) {
      try {
        await expenseService.delete(id);
        loadData(selectedCategory);
      } catch (err) {
        alert('Error deleting expense: ' + err.message);
      }
    }
  };

  // Handle Seed Demo Data
  const handleSeed = async () => {
    try {
      await expenseService.seed();
      loadData(selectedCategory);
    } catch (err) {
      alert('Error seeding data: ' + err.message);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <header className="navbar">
        <div className="navbar-brand">
          <div className="brand-logo">₹</div>
          <div>
            <h1 className="brand-title">SmartSpend</h1>
            <p className="brand-subtitle">Personal Expense Tracker & Analytics Platform</p>
          </div>
        </div>

        <div className="navbar-status">
          {apiError ? (
            <span className="status-pill status-offline">● Backend Offline</span>
          ) : (
            <span className="status-pill status-online">● Spring Boot Connected</span>
          )}
          <button className="btn-secondary btn-sm" onClick={() => loadData(selectedCategory)}>
            ↻ Refresh
          </button>
        </div>
      </header>

      {/* Backend Disconnected Warning */}
      {apiError && (
        <div className="alert-banner">
          <strong>⚠️ Connection Notice:</strong> {apiError}
          <div className="alert-hint">
            To start backend, open a terminal in <code>backend/</code> and run <code>mvn spring-boot:run</code>.
          </div>
        </div>
      )}

      {/* KPI Stat Cards */}
      <ExpenseSummary summary={summary} />

      {/* Main Grid: Form & Visual Analytics */}
      <div className="grid-main">
        <ExpenseForm
          onSave={handleSaveExpense}
          editData={editingExpense}
          onCancel={() => setEditingExpense(null)}
        />
        <CategoryChart
          breakdown={summary?.categoryBreakdown || {}}
          total={summary?.totalExpenses || 0}
        />
      </div>

      {/* Expense Data Table */}
      <ExpenseList
        expenses={expenses}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onEdit={setEditingExpense}
        onDelete={handleDeleteExpense}
        onSeed={handleSeed}
      />

      {/* Footer */}
      <footer className="footer">
        <p>Full Stack Capstone Project | Built with <strong>React.js</strong>, <strong>Spring Boot 3</strong>, and <strong>REST APIs</strong></p>
      </footer>
    </div>
  );
}
