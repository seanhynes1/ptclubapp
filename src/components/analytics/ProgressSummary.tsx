import React from 'react';
import { TrackingEntry } from '../../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ProgressSummary({ entries }: { entries: TrackingEntry[] }) {
  if (entries.length < 2) {
    return (
      <div className="text-center text-gray-400">
        Add more entries to see your progress summary
      </div>
    );
  }

  const sortedEntries = entries.slice().sort((a, b) => b.date.seconds - a.date.seconds);
  const latestEntry = sortedEntries[0];
  const previousEntry = sortedEntries[1];

  const weightChange = latestEntry.weight - previousEntry.weight;
  const calorieChange = latestEntry.calories_consumed - previousEntry.calories_consumed;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Progress Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChangeCard
          label="Weight Change"
          value={Math.abs(weightChange).toFixed(1)}
          unit="kg"
          trend={weightChange}
        />
        <ChangeCard
          label="Calorie Intake Change"
          value={Math.abs(calorieChange).toString()}
          unit="cal"
          trend={calorieChange}
        />
      </div>
    </div>
  );
}

function ChangeCard({ 
  label, 
  value, 
  unit, 
  trend 
}: { 
  label: string;
  value: string;
  unit: string;
  trend: number;
}) {
  const isPositive = trend > 0;
  
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <div className="flex items-center space-x-2 mt-1">
        {isPositive ? (
          <TrendingUp className="h-5 w-5 text-red-400" />
        ) : (
          <TrendingDown className="h-5 w-5 text-green-400" />
        )}
        <p className="text-xl font-semibold text-white">
          {value} {unit}
        </p>
      </div>
    </div>
  );
}