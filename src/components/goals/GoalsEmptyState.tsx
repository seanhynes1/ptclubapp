import React from 'react';
import { Target } from 'lucide-react';

interface GoalsEmptyStateProps {
  onCreateClick: () => void;
}

export function GoalsEmptyState({ onCreateClick }: GoalsEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4">
        <Target className="h-8 w-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No goals set</h3>
      <p className="text-gray-400 mb-6">
        Set your first fitness goal and track your progress
      </p>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        <span>Set Your First Goal</span>
      </button>
    </div>
  );
}