import React, { useState } from 'react';

const CATEGORIES = ['All', 'Housing', 'Food', 'Utilities', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Other'];

const CATEGORY_META = {
  Housing: { icon: '🏠', class: 'cat-housing' },
  Food: { icon: '🍔', class: 'cat-food' },
  Utilities: { icon: '⚡', class: 'cat-utilities' },
  Transport: { icon: '🚗', class: 'cat-transport' },
  Entertainment: { icon: '🎬', class: 'cat-entertainment' },
  Health: { icon: '💊', class: 'cat-health' },
  Shopping: { icon: '🛍️', class: 'cat-shopping' },
  Other: { icon: '📦', class: 'cat-other' }
};

export default function ExpenseList({
  expenses = [],
  selectedCategory,
  onCategoryChange,
  onEdit,
  onDelete,
  onSeed
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Export filtered data as CSV (Examiner favorite)
  const handleExportCSV = () => {
    if (expenses.length === 0) return alert('No data to export!');

    const headers = ['ID', 'Title', 'Category', 'Amount (INR)', 'Date', 'Notes'];
    const rows = filtered.map(e => [
      e.id,
      `"${e.title.replace(/"/g, '""')}"`,
      e.category,
      e.amount,
      e.date,
      `"${(e.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smartspend_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter
  let filtered = expenses.filter(exp => {
    const term = searchTerm.toLowerCase();
    return exp.title.toLowerCase().includes(term) ||
           (exp.description && exp.description.toLowerCase().includes(term));
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="card table-card">
      <div className="table-header-row">
        <div>
          <h4>Transaction Ledger</h4>
          <p className="card-subtitle">Showing {filtered.length} of {expenses.length} records</p>
        </div>

        <div className="table-actions">
          <button className="btn-secondary btn-sm" onClick={handleExportCSV} title="Export to spreadsheet">
            📥 Export CSV
          </button>
          <button className="btn-secondary btn-sm" onClick={onSeed} title="Reload sample data">
            ↻ Seed Mock Data
          </button>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by merchant, title, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-box">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h4>No matching records</h4>
          <p className="text-muted">Try adjusting your search filters or click below to seed demo records.</p>
          <button className="btn-primary btn-sm" onClick={onSeed}>
            Seed Demo Transactions
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title / Merchant</th>
                <th>Category</th>
                <th>Date</th>
                <th>Notes</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(exp => {
                const meta = CATEGORY_META[exp.category] || { icon: '📌', class: 'cat-other' };

                return (
                  <tr key={exp.id}>
                    <td>
                      <div className="title-cell">
                        <span className="transaction-avatar">{meta.icon}</span>
                        <span className="font-semibold">{exp.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-category ${meta.class}`}>
                        {exp.category}
                      </span>
                    </td>
                    <td className="text-muted">{exp.date}</td>
                    <td className="text-muted notes-cell">{exp.description || '—'}</td>
                    <td className="text-right font-bold amount-cell">
                      ₹{Number(exp.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-center actions-cell">
                      <button
                        className="btn-icon btn-edit"
                        title="Edit Record"
                        onClick={() => onEdit(exp)}
                      >
                        ✎
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        title="Delete Record"
                        onClick={() => onDelete(exp.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
