import React from 'react';
import { Dumbbell } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4">
        <Dumbbell className="h-8 w-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No workouts yet</h3>
      <p className="text-gray-400 mb-6">
        Create your first workout to get started with your training routine
      </p>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        <span>Create Your First Workout</span>
      </button>
    </div>
  );
}