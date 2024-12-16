import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TrackingEntry } from '../types';

export function useTrackingEntries(userId: string | undefined) {
  const [entries, setEntries] = useState<TrackingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Using a simpler query initially, will sort client-side
    const q = query(
      collection(db, 'tracking_entries'),
      where('user_id', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }) as TrackingEntry)
        .sort((a, b) => b.date.seconds - a.date.seconds); // Client-side sorting
      
      setEntries(newEntries);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  return { entries, loading };
}