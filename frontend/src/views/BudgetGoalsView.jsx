import React, { useState } from 'react';

const DEFAULT_BUDGETS = {
  Housing: 15000,
  Food: 5000,
  Utilities: 2500,
  Transport: 1500,
  Entertainment: 1200,
  Shopping: 2000,
  Health: 1500,
  Other: 1000
};

export default function BudgetGoalsView({ summary }) {
  const [budgets, setBudgets] = useState(DEFAULT_BUDGETS);
  const [editingCategory, setEditingCategory] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const categoryBreakdown = summary?.categoryBreakdown || {};

  const handleEdit = (cat, currentLimit) => {
    setEditingCategory(cat);
    setTempValue(currentLimit);
  };

  const handleSave = (cat) => {
    setBudgets(prev => ({ ...prev, [cat]: Number(tempValue) || prev[cat] }));
    setEditingCategory(null);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Budget & Category Spending Caps</h2>
          <p className="text-muted">Set limits, control variance, and monitor fiscal targets</p>
        </div>
      </div>

      <div className="grid-summary">
        {Object.entries(budgets).map(([category, limit]) => {
          const spent = categoryBreakdown[category] || 0;
          const percentage = Math.min(Math.round((spent / limit) * 100), 100);
          const isOver = spent > limit;
          const remaining = Math.max(limit - spent, 0);

          return (
            <div key={category} className={`stat-card ${isOver ? 'border-danger' : ''}`}>
              <div className="stat-header">
                <span className="stat-label"><strong>{category}</strong></span>
                <span className={`status-pill ${isOver ? 'status-offline' : 'status-online'}`}>
                  {isOver ? '⚠️ Exceeded' : '✓ Safe'}
                </span>
              </div>

              {editingCategory === category ? (
                <div className="budget-edit-row">
                  <span>₹</span>
                  <input
                    type="number"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="budget-input"
                    autoFocus
                  />
                  <button className="btn-secondary btn-sm" onClick={() => handleSave(category)}>Save</button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="stat-value">₹{spent.toLocaleString('en-IN')}</h3>
                  <span className="text-muted" style={{ fontSize: '13px' }}>
                    Cap: ₹{limit.toLocaleString('en-IN')}
                    <button className="btn-link" style={{ marginLeft: '6px' }} onClick={() => handleEdit(category, limit)}>✎</button>
                  </span>
                </div>
              )}

              <div className="budget-progress-container">
                <div className="budget-progress-bar">
                  <div
                    className={`budget-progress-fill ${isOver ? 'fill-danger' : percentage > 80 ? 'fill-warning' : 'fill-primary'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="budget-progress-labels">
                  <span className={isOver ? 'text-danger' : 'text-muted'}>
                    {percentage}% spent
                  </span>
                  <span className="text-muted">
                    {isOver ? `Exceeded by ₹${(spent - limit).toLocaleString('en-IN')}` : `₹${remaining.toLocaleString('en-IN')} remaining`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
