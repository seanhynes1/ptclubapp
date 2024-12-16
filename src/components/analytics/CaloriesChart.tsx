import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { TrackingEntry } from '../../types';

export function CaloriesChart({ entries }: { entries: TrackingEntry[] }) {
  const data = entries
    .slice()
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .map(entry => ({
      date: format(entry.date.toDate(), 'MMM d'),
      calories: entry.calories_consumed
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
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
        <Bar 
          dataKey="calories" 
          fill="#60a5fa" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}