import { Timestamp } from 'firebase/firestore';

export interface TrackingEntry {
  id: string;
  user_id: string;
  date: Timestamp;
  weight: number;
  workout_completed: boolean;
  calories_consumed: number;
  notes?: string;
  created_at: Timestamp;
}

export interface TrackingEntryInput {
  weight: number;
  workout_completed: boolean;
  calories_consumed: number;
  notes?: string;
}