import React from 'react';
import { TrendingUp } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <TrendingUp className="h-8 w-8 text-yellow-300" />
      <span className="text-2xl font-bold text-white">PT Club</span>
    </div>
  );
}