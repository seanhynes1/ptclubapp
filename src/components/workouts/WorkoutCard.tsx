import React from 'react';
import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { Workout } from '../../types/workout';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-800/80 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Dumbbell className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">{workout.name}</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {workout.exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="p-3 bg-gray-900 rounded flex justify-between items-center"
          >
            <div>
              <p className="text-white font-medium">{exercise.name}</p>
              <p className="text-sm text-gray-400">
                {exercise.sets} sets × {exercise.reps} reps
                {exercise.weight && ` @ ${exercise.weight}kg`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}