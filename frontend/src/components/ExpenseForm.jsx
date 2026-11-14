import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Housing', 'Food', 'Utilities', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Other'];

export default function ExpenseForm({ onSave, editData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        amount: editData.amount || '',
        category: editData.category || 'Food',
        date: editData.date || new Date().toISOString().split('T')[0],
        description: editData.description || ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter a title');
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      setError('Amount must be greater than zero');
      return;
    }
    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    setError('');
    onSave({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    if (!editData) {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  };

  return (
    <div className="card form-card">
      <div className="card-header">
        <h4>{editData ? 'Edit Expense' : 'Add New Expense'}</h4>
        {editData && (
          <button type="button" className="btn-secondary btn-sm" onClick={onCancel}>
            Cancel Edit
          </button>
        )}
      </div>

      {error && <div className="alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title / Description</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Grocery Run, Coffee, Flat Rent"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0.01"
              placeholder="e.g. 250.00"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes / Remarks (Optional)</label>
          <input
            type="text"
            name="description"
            placeholder="Optional notes..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          {editData ? 'Update Expense' : '+ Add Transaction'}
        </button>
      </form>
    </div>
  );
}
