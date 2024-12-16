import React from 'react';
import { useTrackingEntries } from '../../hooks/useTrackingEntries';
import { WeightChart } from './WeightChart';
import { CaloriesChart } from './CaloriesChart';
import { WorkoutStats } from './WorkoutStats';
import { ProgressSummary } from './ProgressSummary';

export function AnalyticsTab({ userId }: { userId: string }) {
  const { entries, loading } = useTrackingEntries(userId);

  if (loading) {
    return <div className="text-center text-gray-400">Loading analytics...</div>;
  }

  return (
    <div className="space-y-8">
      <ProgressSummary entries={entries} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Weight Progress</h3>
          <WeightChart entries={entries} />
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Calorie Intake</h3>
          <CaloriesChart entries={entries} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Workout Consistency</h3>
        <WorkoutStats entries={entries} />
      </div>
    </div>
  );
}