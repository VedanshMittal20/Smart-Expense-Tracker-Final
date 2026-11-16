import React, { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

export default function TransactionsView({
  expenses = [],
  selectedCategory,
  onCategoryChange,
  onSaveExpense,
  onDeleteExpense,
  onSeed
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (exp) => {
    setEditingExpense(exp);
    setShowAddModal(true);
  };

  const handleSave = (data) => {
    onSaveExpense(data, editingExpense?.id);
    setShowAddModal(false);
    setEditingExpense(null);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Transaction Ledger</h2>
          <p className="text-muted">Manage, filter, audit and export financial records</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditingExpense(null); setShowAddModal(true); }}>
          + New Transaction
        </button>
      </div>

      {/* Add / Edit Modal Drawer */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingExpense ? 'Edit Transaction' : 'Record New Expense'}</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <ExpenseForm
              onSave={handleSave}
              editData={editingExpense}
              onCancel={() => { setShowAddModal(false); setEditingExpense(null); }}
            />
          </div>
        </div>
      )}

      {/* Comprehensive Table */}
      <ExpenseList
        expenses={expenses}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onEdit={handleEdit}
        onDelete={onDeleteExpense}
        onSeed={onSeed}
      />
    </div>
  );
}
