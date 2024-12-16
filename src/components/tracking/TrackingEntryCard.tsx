import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TrackingEntry } from '../../types';

interface TrackingEntryCardProps {
  entry: TrackingEntry;
}

export function TrackingEntryCard({ entry }: TrackingEntryCardProps) {
  return (
    <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">
            {format(entry.date.toDate(), 'PPP')}
          </p>
          <p className="text-white mt-1">Weight: {entry.weight} kg</p>
          <p className="text-white">
            Calories: {entry.calories_consumed}
          </p>
        </div>
        <div className="flex items-center">
          {entry.workout_completed ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
      </div>
      {entry.notes && (
        <p className="mt-2 text-sm text-gray-400">{entry.notes}</p>
      )}
    </div>
  );
}