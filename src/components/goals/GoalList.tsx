import React from 'react';
import { Goal } from '../../types/goal';
import { GoalProgressCard } from './GoalProgressCard';

interface GoalListProps {
  goals: Goal[];
  onGoalsUpdate: () => void;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
}

export function GoalList({ goals, onGoalsUpdate, onEdit, onDelete }: GoalListProps) {
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Active Goals</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {activeGoals.map((goal) => (
            <GoalProgressCard
              key={goal.id}
              goal={goal}
              onUpdate={onGoalsUpdate}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      {completedGoals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Completed Goals</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {completedGoals.map((goal) => (
              <GoalProgressCard
                key={goal.id}
                goal={goal}
                onUpdate={onGoalsUpdate}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}