import React from 'react';
import { format } from 'date-fns';
import { Target, Trophy, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Goal } from '../../types/goal';

interface GoalProgressCardProps {
  goal: Goal;
  onUpdate: () => void;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
}

export function GoalProgressCard({ goal, onUpdate, onEdit, onDelete }: GoalProgressCardProps) {
  const progress = goal.type === 'weight_change'
    ? calculateWeightProgress(goal.target, goal.current)
    : (goal.current / goal.target) * 100;

  const formattedDeadline = format(goal.deadline.toDate(), 'PPP');

  function calculateWeightProgress(target: number, current: number): number {
    const totalChange = Math.abs(target - current);
    const initialDiff = Math.abs(target - current);
    return Math.min(100, (1 - (totalChange / initialDiff)) * 100);
  }

  const getGoalTypeLabel = (type: Goal['type']) => {
    switch (type) {
      case 'workout_count':
        return 'Workouts Completed';
      case 'weight_change':
        return 'Weight Goal';
      case 'calorie_target':
        return 'Days Within Calorie Target';
    }
  };

  const getProgressLabel = () => {
    switch (goal.type) {
      case 'workout_count':
        return `${goal.current}/${goal.target} workouts`;
      case 'weight_change':
        return `Current: ${goal.current.toFixed(1)}kg / Target: ${goal.target}kg`;
      case 'calorie_target':
        return `${goal.current}/${goal.target} days`;
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${goal.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-400" />
          <h4 className="text-lg font-medium text-white">
            {getGoalTypeLabel(goal.type)}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          {goal.completed ? (
            <Trophy className="h-5 w-5 text-yellow-400" />
          ) : (
            <>
              <button
                onClick={() => onEdit(goal)}
                className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(goal.id)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
          <p className="mt-1 text-white font-medium">
            {getProgressLabel()}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{formattedDeadline}</span>
          </div>
          <div className="text-gray-400">
            Reward: <span className="text-white">{goal.reward}</span>
          </div>
        </div>
      </div>
    </div>
  );
}