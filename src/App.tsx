import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { loadState, saveState } from './utils/storage';
import type { AppState, Expense, User } from './types';

function App() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleLogin = (user: User) => {
    setState(prev => ({ ...prev, currentUser: user }));
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const handleAddExpense = (data: {
    amount: number;
    description: string;
    category: string;
    type: 'debit' | 'credit';
    documentUrl?: string;
  }) => {
    if (!state.currentUser) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      userId: state.currentUser.id,
      date: new Date().toISOString(),
      markedForDeletion: false,
      ...data,
    };

    setState(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
  };

  const handleMarkForDeletion = (id: string) => {
    setState(prev => ({
      ...prev,
      expenses: prev.expenses.map(expense =>
        expense.id === id
          ? { ...expense, markedForDeletion: true }
          : expense
      ),
    }));
  };

  const handleDelete = (id: string) => {
    setState(prev => ({
      ...prev,
      expenses: prev.expenses.filter(expense => expense.id !== id),
    }));
  };

  if (!state.currentUser) {
    return <Login users={state.users} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentUser={state.currentUser} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <ExpenseForm
          currentUser={state.currentUser}
          onAddExpense={handleAddExpense}
        />
        <ExpenseList
          expenses={state.expenses}
          users={state.users}
          currentUser={state.currentUser}
          onMarkForDeletion={handleMarkForDeletion}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;