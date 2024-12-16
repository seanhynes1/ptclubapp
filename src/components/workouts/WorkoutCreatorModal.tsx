import React from 'react';
import { X } from 'lucide-react';
import { WorkoutCreator } from './WorkoutCreator';
import { Workout } from '../../types/workout';

interface WorkoutCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  workout?: Workout | null;
  onWorkoutSaved: () => void;
}

export function WorkoutCreatorModal({
  isOpen,
  onClose,
  userId,
  workout,
  onWorkoutSaved,
}: WorkoutCreatorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            {workout ? 'Edit Workout' : 'Create New Workout'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <WorkoutCreator
            userId={userId}
            workout={workout}
            onWorkoutCreated={onWorkoutSaved}
          />
        </div>
      </div>
    </div>
  );
}