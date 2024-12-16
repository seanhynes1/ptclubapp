import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Exercise, Workout } from '../types/workout';

export async function createWorkout(userId: string, name: string, exercises: Omit<Exercise, 'id'>[]) {
  const workout = {
    user_id: userId,
    name,
    exercises: exercises.map(exercise => ({
      ...exercise,
      id: crypto.randomUUID()
    })),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now()
  };

  return addDoc(collection(db, 'workouts'), workout);
}

export async function updateWorkout(workoutId: string, name: string, exercises: Exercise[]) {
  const workoutRef = doc(db, 'workouts', workoutId);
  return updateDoc(workoutRef, {
    name,
    exercises,
    updated_at: Timestamp.now()
  });
}

export async function deleteWorkout(workoutId: string) {
  const workoutRef = doc(db, 'workouts', workoutId);
  return deleteDoc(workoutRef);
}

export async function getUserWorkouts(userId: string) {
  const q = query(
    collection(db, 'workouts'),
    where('user_id', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Workout[];
}