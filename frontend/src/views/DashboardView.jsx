import React from 'react';
import ExpenseSummary from '../components/ExpenseSummary';
import CategoryChart from '../components/CategoryChart';
import ExpenseForm from '../components/ExpenseForm';

export default function DashboardView({
  summary,
  expenses = [],
  onSaveExpense,
  onViewAllTransactions
}) {
  const recentTransactions = expenses.slice(0, 5);

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Financial Dashboard</h2>
          <p className="text-muted">Executive summary & real-time liquidity overview</p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <ExpenseSummary summary={summary} />

      {/* Main Grid: Add Quick Expense & Analytics */}
      <div className="grid-main">
        <ExpenseForm onSave={onSaveExpense} />
        <CategoryChart
          breakdown={summary?.categoryBreakdown || {}}
          total={summary?.totalExpenses || 0}
        />
      </div>

      {/* Recent Activity Table Preview */}
      <div className="card recent-card">
        <div className="card-header">
          <div>
            <h4>Recent Transactions (Latest 5)</h4>
            <p className="card-subtitle">Quick overview of recent account activity</p>
          </div>
          <button className="btn-secondary btn-sm" onClick={onViewAllTransactions}>
            View Full Ledger →
          </button>
        </div>

        <div className="table-responsive">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(exp => (
                <tr key={exp.id}>
                  <td className="font-semibold">{exp.title}</td>
                  <td>
                    <span className="badge-category cat-housing">{exp.category}</span>
                  </td>
                  <td className="text-muted">{exp.date}</td>
                  <td className="text-right font-bold amount-cell">
                    ₹{Number(exp.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
