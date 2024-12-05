import React from 'react';
import { DollarSign, LogOut } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

export function Header({ currentUser, onLogout }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DollarSign className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Budget Tracker</h1>
        </div>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {currentUser.name} ({currentUser.isAdmin ? 'Admin' : 'Member'})
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-indigo-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}