import React from 'react';
import { Trash2, XCircle } from 'lucide-react';
import type { Expense, User } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  users: User[];
  currentUser: User;
  onMarkForDeletion: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({
  expenses,
  users,
  currentUser,
  onMarkForDeletion,
  onDelete,
}: ExpenseListProps) {
  const totalDebit = expenses.reduce((sum, exp) => 
    exp.type === 'debit' ? sum + exp.amount : sum, 0
  );
  const totalCredit = expenses.reduce((sum, exp) => 
    exp.type === 'credit' ? sum + exp.amount : sum, 0
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {currentUser.isAdmin && (
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700">Total Debit</h3>
              <p className="text-2xl font-bold text-red-800">${totalDebit.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Total Credit</h3>
              <p className="text-2xl font-bold text-green-800">${totalCredit.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => {
            const user = users.find(u => u.id === expense.userId);
            return (
              <tr key={expense.id} className={expense.markedForDeletion ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={expense.type === 'debit' ? 'text-red-600' : 'text-green-600'}>
                    ${expense.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    expense.type === 'debit' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {expense.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.documentUrl && (
                    <a
                      href={expense.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {currentUser.isAdmin ? (
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onMarkForDeletion(expense.id)}
                      className="text-gray-600 hover:text-gray-900"
                      disabled={expense.markedForDeletion}
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}