import React, { useState } from 'react';
import { useTrackingEntries } from '../../hooks/useTrackingEntries';
import { TrackingEntryCard } from './TrackingEntryCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function TrackingHistory({ userId }: { userId: string }) {
  const { entries, loading } = useTrackingEntries(userId);
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  const displayedEntries = isExpanded ? entries : entries.slice(0, 3);
  const hasMoreEntries = entries.length > 3;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">History</h3>
        {hasMoreEntries && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{isExpanded ? 'Show Less' : 'View All'}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {displayedEntries.map((entry) => (
          <TrackingEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}