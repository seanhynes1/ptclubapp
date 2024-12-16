import { Timestamp } from 'firebase/firestore';

export type GoalType = 'workout_count' | 'weight_change' | 'calorie_target';

export interface Goal {
  id: string;
  user_id: string;
  type: GoalType;
  target: number;
  current: number;
  reward: string;
  deadline: Timestamp;
  created_at: Timestamp;
  completed: boolean;
}

export interface GoalInput {
  type: GoalType;
  target: number;
  reward: string;
  deadline: Date;
}