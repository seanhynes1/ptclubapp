export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  user_id: string;
  name: string;
  exercises: Exercise[];
  created_at: Date;
  updated_at: Date;
}