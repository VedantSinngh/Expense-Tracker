export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'debit' | 'credit';
  documentUrl?: string;
  markedForDeletion: boolean;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  expenses: Expense[];
}