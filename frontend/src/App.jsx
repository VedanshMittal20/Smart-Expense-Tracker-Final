import React, { useState, useEffect } from 'react';
import { expenseService } from './services/expenseService';
import DashboardView from './views/DashboardView';
import TransactionsView from './views/TransactionsView';
import AnalyticsView from './views/AnalyticsView';
import BudgetGoalsView from './views/BudgetGoalsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
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
      setApiError('Unable to connect to Spring Boot backend (http://localhost:8081). Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedCategory);
  }, [selectedCategory]);

  // Handle Save (Create or Update)
  const handleSaveExpense = async (formData, existingId = null) => {
    try {
      if (existingId) {
        await expenseService.update(existingId, formData);
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

  // Handle Seed
  const handleSeed = async () => {
    try {
      await expenseService.seed();
      loadData(selectedCategory);
    } catch (err) {
      alert('Error seeding data: ' + err.message);
    }
  };

  return (
    <div className="layout-root">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">₹</div>
          <div>
            <h2 className="brand-title">SmartSpend</h2>
            <p className="brand-badge">Full Stack Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'nav-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'transactions' ? 'nav-active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <span className="nav-icon">💳</span>
            <span>Transactions</span>
            <span className="nav-count">{expenses.length}</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'analytics' ? 'nav-active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="nav-icon">📈</span>
            <span>Analytics & Reports</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'budgets' ? 'nav-active' : ''}`}
            onClick={() => setActiveTab('budgets')}
          >
            <span className="nav-icon">🎯</span>
            <span>Budget Goals</span>
          </button>
        </nav>

        {/* Sidebar Footer with Live Connection Status */}
        <div className="sidebar-footer">
          <div className="status-box">
            {apiError ? (
              <span className="status-pill status-offline">● Backend Offline</span>
            ) : (
              <span className="status-pill status-online">● Spring Boot Live</span>
            )}
            <button className="btn-icon btn-refresh" title="Reload Data" onClick={() => loadData(selectedCategory)}>
              ↻
            </button>
          </div>

          <div className="user-profile">
            <div className="user-avatar">👨‍💻</div>
            <div className="user-info">
              <strong>Capstone Candidate</strong>
              <small className="text-muted">Spring Boot & React</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="content-area">
        {apiError && (
          <div className="alert-banner">
            <strong>⚠️ Connection Notice:</strong> {apiError}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            summary={summary}
            expenses={expenses}
            onSaveExpense={(d) => handleSaveExpense(d)}
            onViewAllTransactions={() => setActiveTab('transactions')}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsView
            expenses={expenses}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSaveExpense={handleSaveExpense}
            onDeleteExpense={handleDeleteExpense}
            onSeed={handleSeed}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            summary={summary}
            expenses={expenses}
          />
        )}

        {activeTab === 'budgets' && (
          <BudgetGoalsView
            summary={summary}
          />
        )}
      </main>
    </div>
  );
}
