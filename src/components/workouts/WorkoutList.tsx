import React from 'react';
import { WorkoutCard } from './WorkoutCard';
import { Workout } from '../../types/workout';

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (workoutId: string) => void;
}

export function WorkoutList({ workouts, onEdit, onDelete }: WorkoutListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onEdit={() => onEdit(workout)}
          onDelete={() => onDelete(workout.id)}
        />
      ))}
    </div>
  );
}