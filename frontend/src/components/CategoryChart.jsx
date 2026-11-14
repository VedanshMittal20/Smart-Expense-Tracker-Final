import React from 'react';

const CATEGORY_COLORS = {
  Housing: '#4f46e5',
  Food: '#10b981',
  Utilities: '#f59e0b',
  Transport: '#06b6d4',
  Entertainment: '#ec4899',
  Health: '#ef4444',
  Shopping: '#8b5cf6',
  Other: '#64748b'
};

export default function CategoryChart({ breakdown = {}, total = 0 }) {
  const entries = Object.entries(breakdown);

  if (entries.length === 0) {
    return (
      <div className="card chart-card empty-chart">
        <h4>Category Breakdown (Analytics)</h4>
        <p className="text-muted">No expense data available to visualize.</p>
      </div>
    );
  }

  return (
    <div className="card chart-card">
      <div className="chart-header">
        <h4>Category Breakdown (Analytics)</h4>
        <span className="badge-analytics">Visual Aggregation</span>
      </div>

      <div className="bars-container">
        {entries.map(([category, amount]) => {
          const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
          const color = CATEGORY_COLORS[category] || '#6366f1';

          return (
            <div key={category} className="category-bar-row">
              <div className="category-bar-label">
                <span className="category-name">
                  <span className="color-dot" style={{ backgroundColor: color }}></span>
                  {category}
                </span>
                <span className="category-amount">
                  ₹{amount.toLocaleString('en-IN')} <span className="text-muted">({percentage}%)</span>
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color
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
