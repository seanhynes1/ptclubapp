import React from 'react';
import { X } from 'lucide-react';
import { GoalCreator } from './GoalCreator';
import { Goal } from '../../types/goal';

interface GoalCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  goal?: Goal | null;
  onGoalCreated: () => void;
}

export function GoalCreatorModal({
  isOpen,
  onClose,
  userId,
  goal,
  onGoalCreated,
}: GoalCreatorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            {goal ? 'Edit Goal' : 'Set New Goal'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <GoalCreator
            userId={userId}
            goal={goal}
            onGoalCreated={onGoalCreated}
          />
        </div>
      </div>
    </div>
  );
}