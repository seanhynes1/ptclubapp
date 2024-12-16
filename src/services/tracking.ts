import { 
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TrackingEntryInput } from '../types';
import { updateGoalProgress } from './goals';
import { Goal } from '../types/goal';

async function updateGoals(userId: string, data: TrackingEntryInput & { date: Date }) {
  // Get active goals for the user
  const goalsQuery = query(
    collection(db, 'goals'),
    where('user_id', '==', userId),
    where('completed', '==', false)
  );
  
  const goalsSnapshot = await getDocs(goalsQuery);
  const goals = goalsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Goal[];

  // Update each relevant goal
  for (const goal of goals) {
    let shouldUpdate = false;
    let newProgress = goal.current;

    switch (goal.type) {
      case 'workout_count':
        if (data.workout_completed) {
          newProgress = goal.current + 1;
          shouldUpdate = true;
        }
        break;

      case 'weight_change':
        // Only update if this is the latest entry
        const latestQuery = query(
          collection(db, 'tracking_entries'),
          where('user_id', '==', userId),
          where('date', '>', data.date)
        );
        const laterEntries = await getDocs(latestQuery);
        
        if (laterEntries.empty) {
          const weightDiff = data.weight - goal.target;
          newProgress = data.weight;
          shouldUpdate = true;
        }
        break;

      case 'calorie_target':
        if (data.calories_consumed <= goal.target) {
          newProgress = goal.current + 1;
          shouldUpdate = true;
        }
        break;
    }

    if (shouldUpdate) {
      const completed = goal.type === 'weight_change' 
        ? (goal.target > data.weight) === (goal.target > newProgress)
        : newProgress >= goal.target;

      await updateGoalProgress(goal.id, newProgress, completed);
    }
  }
}

export async function addTrackingEntry(userId: string, data: TrackingEntryInput & { date: Date }) {
  const entryRef = await addDoc(collection(db, 'tracking_entries'), {
    user_id: userId,
    date: Timestamp.fromDate(data.date),
    weight: data.weight,
    workout_completed: data.workout_completed,
    calories_consumed: data.calories_consumed,
    notes: data.notes,
    created_at: Timestamp.now()
  });

  // Update goals after adding the entry
  await updateGoals(userId, data);

  return entryRef;
}