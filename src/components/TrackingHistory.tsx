import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrackingEntry } from '../types';
import { format } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';

export function TrackingHistory() {
  const [entries, setEntries] = useState<TrackingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('tracking_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        setEntries(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">History</h3>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 rounded-lg bg-gray-800 border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">
                  {format(new Date(entry.date), 'PPP')}
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
        ))}
      </div>
    </div>
  );
}