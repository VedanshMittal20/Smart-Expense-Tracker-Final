import React from 'react';
import CategoryChart from '../components/CategoryChart';

export default function AnalyticsView({ summary, expenses = [] }) {
  if (!summary) return null;

  const {
    totalExpenses = 0,
    totalTransactions = 0,
    averageExpense = 0,
    topCategory = 'None',
    categoryBreakdown = {}
  } = summary;

  // Compute advanced metrics (Data Analysis)
  const amounts = expenses.map(e => e.amount);
  const maxExpense = amounts.length > 0 ? Math.max(...amounts) : 0;
  const minExpense = amounts.length > 0 ? Math.min(...amounts) : 0;
  const highestTransaction = expenses.find(e => e.amount === maxExpense);

  const breakdownEntries = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]);

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Analytics & Financial Intelligence</h2>
          <p className="text-muted">Statistical aggregation, category shares & spending velocity</p>
        </div>
      </div>

      {/* Advanced Statistical Cards */}
      <div className="grid-summary">
        <div className="stat-card">
          <span className="stat-label">Largest Single Outflow</span>
          <h2 className="stat-value text-danger">₹{maxExpense.toLocaleString('en-IN')}</h2>
          <div className="stat-meta text-muted">
            {highestTransaction ? `${highestTransaction.title} (${highestTransaction.category})` : 'None'}
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Smallest Outflow</span>
          <h2 className="stat-value text-success">₹{minExpense.toLocaleString('en-IN')}</h2>
          <div className="stat-meta text-muted">Lowest recorded transaction</div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Active Sectors</span>
          <h2 className="stat-value">{breakdownEntries.length} Categories</h2>
          <div className="stat-meta text-muted">Across expenditure matrix</div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Transaction Volume</span>
          <h2 className="stat-value">{totalTransactions} Entries</h2>
          <div className="stat-meta text-muted">Average ₹{Number(averageExpense).toFixed(0)} / txn</div>
        </div>
      </div>

      {/* Visual Analytics Chart */}
      <div className="grid-main" style={{ gridTemplateColumns: '1fr' }}>
        <CategoryChart breakdown={categoryBreakdown} total={totalExpenses} />
      </div>

      {/* Sector Performance Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h4>Sector Distribution Matrix</h4>
            <p className="card-subtitle">Detailed categorization share analysis</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Category</th>
                <th className="text-right">Total Outflow</th>
                <th className="text-right">% Share</th>
                <th className="text-right">Transaction Count</th>
              </tr>
            </thead>
            <tbody>
              {breakdownEntries.map(([cat, amount], idx) => {
                const share = totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : '0';
                const count = expenses.filter(e => e.category === cat).length;

                return (
                  <tr key={cat}>
                    <td className="font-semibold">#{idx + 1}</td>
                    <td>
                      <span className="badge-category cat-housing">{cat}</span>
                    </td>
                    <td className="text-right font-bold">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="text-right">{share}%</td>
                    <td className="text-right text-muted">{count} txns</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
