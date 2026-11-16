import React, { useState } from 'react';

export default function ExpenseSummary({ summary }) {
  const [budget, setBudget] = useState(25000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  if (!summary) return null;

  const {
    totalExpenses = 0,
    totalTransactions = 0,
    averageExpense = 0,
    topCategory = 'None'
  } = summary;

  const budgetUsedPercent = Math.min(Math.round((totalExpenses / budget) * 100), 100);
  const remainingBudget = Math.max(budget - totalExpenses, 0);
  const isOverBudget = totalExpenses > budget;

  // Approximate daily average assuming 30-day month
  const dailyBurn = Math.round(totalExpenses / 30);

  return (
    <div className="summary-wrapper">
      <div className="grid-summary">
        {/* Total Spent */}
        <div className="stat-card stat-card-highlight">
          <div className="stat-header">
            <span className="stat-label">Total Outflow</span>
            <span className="stat-badge">Live</span>
          </div>
          <h2 className="stat-value">₹{Number(totalExpenses).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          <div className="stat-meta text-muted">
            Across {totalTransactions} logged transactions
          </div>
        </div>

        {/* Monthly Budget Tracker */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Monthly Budget</span>
            <button
              className="btn-link"
              onClick={() => setIsEditingBudget(!isEditingBudget)}
            >
              {isEditingBudget ? 'Done' : 'Edit Limit'}
            </button>
          </div>

          {isEditingBudget ? (
            <div className="budget-edit-row">
              <span>₹</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || 1)}
                className="budget-input"
                autoFocus
              />
            </div>
          ) : (
            <h2 className="stat-value">₹{budget.toLocaleString('en-IN')}</h2>
          )}

          <div className="budget-progress-container">
            <div className="budget-progress-bar">
              <div
                className={`budget-progress-fill ${isOverBudget ? 'fill-danger' : budgetUsedPercent > 80 ? 'fill-warning' : 'fill-primary'}`}
                style={{ width: `${budgetUsedPercent}%` }}
              ></div>
            </div>
            <div className="budget-progress-labels">
              <span className={isOverBudget ? 'text-danger' : 'text-muted'}>
                {budgetUsedPercent}% utilized
              </span>
              <span className="text-muted">
                {isOverBudget ? 'Over Budget!' : `₹${remainingBudget.toLocaleString('en-IN')} left`}
              </span>
            </div>
          </div>
        </div>

        {/* Daily Burn Rate */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Est. Daily Burn</span>
            <span className="stat-icon-pill">⚡</span>
          </div>
          <h2 className="stat-value">₹{dailyBurn.toLocaleString('en-IN')} <span className="stat-unit">/ day</span></h2>
          <div className="stat-meta text-muted">
            Avg transaction: ₹{Number(averageExpense).toLocaleString('en-IN', { minimumFractionDigits: 0 })}
          </div>
        </div>

        {/* Top Spending Sector */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Top Category</span>
            <span className="stat-icon-pill">📊</span>
          </div>
          <h2 className="stat-value cat-highlight">{topCategory || 'N/A'}</h2>
          <div className="stat-meta text-muted">
            Highest cumulative financial outflow
          </div>
        </div>
      </div>
    </div>
  );
}
