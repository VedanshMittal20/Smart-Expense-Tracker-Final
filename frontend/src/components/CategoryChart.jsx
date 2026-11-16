import React from 'react';

const CATEGORY_META = {
  Housing: { color: '#6366f1', icon: '🏠' },
  Food: { color: '#10b981', icon: '🍔' },
  Utilities: { color: '#f59e0b', icon: '⚡' },
  Transport: { color: '#06b6d4', icon: '🚗' },
  Entertainment: { color: '#ec4899', icon: '🎬' },
  Health: { color: '#ef4444', icon: '💊' },
  Shopping: { color: '#8b5cf6', icon: '🛍️' },
  Other: { color: '#64748b', icon: '📦' }
};

export default function CategoryChart({ breakdown = {}, total = 0 }) {
  const entries = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <div className="card chart-card empty-chart">
        <h4>Expenditure Analytics</h4>
        <p className="text-muted">No expense data available to visualize.</p>
      </div>
    );
  }

  const topCategoryEntry = entries[0];
  const topCategoryPercentage = total > 0 ? Math.round((topCategoryEntry[1] / total) * 100) : 0;

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <div>
          <h4>Spending Breakdown by Sector</h4>
          <p className="card-subtitle">Real-time expenditure aggregation</p>
        </div>
        <span className="badge-analytics">Visual Analytics</span>
      </div>

      {/* Analytics Insight Callout Box */}
      <div className="insight-callout">
        <span className="insight-icon">💡</span>
        <div className="insight-text">
          <strong>Key Insight:</strong> <span>{topCategoryEntry[0]}</span> makes up <strong>{topCategoryPercentage}%</strong> of total outflow.
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bars-container">
        {entries.map(([category, amount]) => {
          const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
          const meta = CATEGORY_META[category] || { color: '#6366f1', icon: '📌' };

          return (
            <div key={category} className="category-bar-row">
              <div className="category-bar-label">
                <span className="category-name">
                  <span className="cat-icon">{meta.icon}</span>
                  <strong>{category}</strong>
                </span>
                <span className="category-amount">
                  ₹{amount.toLocaleString('en-IN')}
                  <span className="percentage-tag">{percentage}%</span>
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: meta.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
