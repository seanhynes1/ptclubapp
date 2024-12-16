import React from 'react';
import { LogOut } from 'lucide-react';
import { Logo } from '../common/Logo';
import { signOut } from '../../services/auth';

export function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
      <Logo />
      <button
        onClick={() => signOut()}
        className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        <LogOut className="h-5 w-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}