const API_BASE_URL = 'http://localhost:8081/api/expenses';

export const expenseService = {
  // Fetch all expenses (with optional category filter)
  getAll: async (category = '') => {
    const url = category && category !== 'All' 
      ? `${API_BASE_URL}?category=${encodeURIComponent(category)}`
      : API_BASE_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
  },

  // Fetch summary and analytics metrics
  getSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/summary`);
    if (!response.ok) throw new Error('Failed to fetch expense summary');
    return response.json();
  },

  // Create new expense
  create: async (expenseData) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) throw new Error('Failed to create expense');
    return response.json();
  },

  // Update existing expense
  update: async (id, expenseData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) throw new Error('Failed to update expense');
    return response.json();
  },

  // Delete expense
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete expense');
    return true;
  },

  // Seed sample demo data
  seed: async () => {
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to seed sample data');
    return response.text();
  }
};
