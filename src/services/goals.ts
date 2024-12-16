import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Goal, GoalInput } from '../types/goal';

export async function createGoal(userId: string, data: GoalInput) {
  return addDoc(collection(db, 'goals'), {
    user_id: userId,
    type: data.type,
    target: data.target,
    current: 0,
    reward: data.reward,
    deadline: Timestamp.fromDate(data.deadline),
    created_at: Timestamp.now(),
    completed: false
  });
}

export async function getUserGoals(userId: string) {
  const q = query(
    collection(db, 'goals'),
    where('user_id', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Goal[];
}

export async function updateGoalProgress(goalId: string, current: number, completed: boolean) {
  const goalRef = doc(db, 'goals', goalId);
  return updateDoc(goalRef, {
    current,
    completed
  });
}

export async function updateGoal(goalId: string, data: GoalInput) {
  const goalRef = doc(db, 'goals', goalId);
  return updateDoc(goalRef, {
    type: data.type,
    target: data.target,
    reward: data.reward,
    deadline: Timestamp.fromDate(data.deadline),
    updated_at: Timestamp.now()
  });
}

export async function deleteGoal(goalId: string) {
  const goalRef = doc(db, 'goals', goalId);
  return deleteDoc(goalRef);
}