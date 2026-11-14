import React from 'react';

export default function ExpenseSummary({ summary }) {
  if (!summary) return null;

  const {
    totalExpenses = 0,
    totalTransactions = 0,
    averageExpense = 0,
    topCategory = 'None'
  } = summary;

  return (
    <div className="grid-summary">
      <div className="stat-card">
        <div className="stat-icon bg-primary">₹</div>
        <div className="stat-info">
          <span className="stat-label">Total Outflow</span>
          <h3 className="stat-value">₹{Number(totalExpenses).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bg-success">#</div>
        <div className="stat-info">
          <span className="stat-label">Total Entries</span>
          <h3 className="stat-value">{totalTransactions}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bg-warning">★</div>
        <div className="stat-info">
          <span className="stat-label">Top Expense Category</span>
          <h3 className="stat-value">{topCategory || 'N/A'}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bg-info">~</div>
        <div className="stat-info">
          <span className="stat-label">Average / Expense</span>
          <h3 className="stat-value">₹{Number(averageExpense).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>
    </div>
  );
}
