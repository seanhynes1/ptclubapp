import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getUserWorkouts, deleteWorkout } from '../../services/workouts';
import { WorkoutList } from './WorkoutList';
import { WorkoutCreatorModal } from './WorkoutCreatorModal';
import { Workout } from '../../types/workout';
import { EmptyState } from './EmptyState';

export function WorkoutTab({ userId }: { userId: string }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  async function loadWorkouts() {
    try {
      const userWorkouts = await getUserWorkouts(userId);
      setWorkouts(userWorkouts);
    } catch (error) {
      console.error('Error loading workouts:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, [userId]);

  async function handleDelete(workoutId: string) {
    if (!confirm('Are you sure you want to delete this workout?')) return;

    try {
      await deleteWorkout(workoutId);
      await loadWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  }

  function handleEdit(workout: Workout) {
    setEditingWorkout(workout);
    setIsCreatorOpen(true);
  }

  if (loading) {
    return <div className="text-center text-gray-400">Loading workouts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Your Workouts</h2>
        <button
          onClick={() => setIsCreatorOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Workout</span>
        </button>
      </div>

      {workouts.length === 0 ? (
        <EmptyState onCreateClick={() => setIsCreatorOpen(true)} />
      ) : (
        <WorkoutList
          workouts={workouts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <WorkoutCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => {
          setIsCreatorOpen(false);
          setEditingWorkout(null);
        }}
        userId={userId}
        workout={editingWorkout}
        onWorkoutSaved={() => {
          loadWorkouts();
          setIsCreatorOpen(false);
          setEditingWorkout(null);
        }}
      />
    </div>
  );
}