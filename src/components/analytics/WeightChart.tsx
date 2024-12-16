import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { TrackingEntry } from '../../types';

export function WeightChart({ entries }: { entries: TrackingEntry[] }) {
  const data = entries
    .slice()
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .map(entry => ({
      date: format(entry.date.toDate(), 'MMM d'),
      weight: entry.weight
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#fff'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="weight" 
          stroke="#60a5fa" 
          strokeWidth={2}
          dot={{ fill: '#60a5fa' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}