import React, { useState } from 'react';

const CATEGORIES = ['All', 'Housing', 'Food', 'Utilities', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Other'];

export default function ExpenseList({
  expenses = [],
  selectedCategory,
  onCategoryChange,
  onEdit,
  onDelete,
  onSeed
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = expenses.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (exp.description && exp.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="card table-card">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search expenses by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <label>Filter:</label>
          <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No expense records found matching your filters.</p>
          <button className="btn-secondary btn-sm" onClick={onSeed}>
            Seed Demo Transactions
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Notes</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(exp => (
                <tr key={exp.id}>
                  <td className="font-semibold">{exp.title}</td>
                  <td>
                    <span className={`badge-category cat-${exp.category.toLowerCase()}`}>
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
                      title="Edit"
                      onClick={() => onEdit(exp)}
                    >
                      ✎
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      title="Delete"
                      onClick={() => onDelete(exp.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
