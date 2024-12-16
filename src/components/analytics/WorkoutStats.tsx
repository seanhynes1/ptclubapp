import React from 'react';
import { Activity, Dumbbell, Calendar } from 'lucide-react';
import { TrackingEntry } from '../../types';

export function WorkoutStats({ entries }: { entries: TrackingEntry[] }) {
  const totalWorkouts = entries.filter(entry => entry.workout_completed).length;
  const workoutStreak = calculateWorkoutStreak(entries);
  const completionRate = (totalWorkouts / entries.length) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={<Dumbbell className="h-6 w-6 text-blue-400" />}
        label="Total Workouts"
        value={totalWorkouts.toString()}
      />
      <StatCard
        icon={<Activity className="h-6 w-6 text-green-400" />}
        label="Current Streak"
        value={`${workoutStreak} days`}
      />
      <StatCard
        icon={<Calendar className="h-6 w-6 text-purple-400" />}
        label="Completion Rate"
        value={`${Math.round(completionRate)}%`}
      />
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function calculateWorkoutStreak(entries: TrackingEntry[]): number {
  let streak = 0;
  const sortedEntries = entries
    .slice()
    .sort((a, b) => b.date.seconds - a.date.seconds);

  for (const entry of sortedEntries) {
    if (entry.workout_completed) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}