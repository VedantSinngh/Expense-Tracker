import { AppState, Expense, User } from '../types';

const STORAGE_KEY = 'budget_tracker_data';

const defaultState: AppState = {
  currentUser: null,
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      isAdmin: true,
    },
    {
      id: '2',
      name: 'Regular User',
      email: 'user@example.com',
      isAdmin: false,
    },
  ],
  expenses: [],
};

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return defaultState;
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState;
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};