import React, { useState } from 'react';
import { Plus, Save, Loader2, X } from 'lucide-react';
import { Exercise } from '../../types/workout';
import { createWorkout } from '../../services/workouts';

interface WorkoutCreatorProps {
  userId: string;
  onWorkoutCreated: () => void;
}

export function WorkoutCreator({ userId, onWorkoutCreated }: WorkoutCreatorProps) {
  const [loading, setLoading] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!workoutName || exercises.length === 0) return;

    setLoading(true);
    try {
      await createWorkout(userId, workoutName, exercises);
      setWorkoutName('');
      setExercises([]);
      onWorkoutCreated();
    } catch (error) {
      console.error('Error creating workout:', error);
    } finally {
      setLoading(false);
    }
  }

  function addExercise() {
    setExercises([...exercises, {
      name: '',
      sets: 3,
      reps: 10
    }]);
  }

  function removeExercise(index: number) {
    setExercises(exercises.filter((_, i) => i !== index));
  }

  function updateExercise(index: number, field: keyof Exercise, value: string | number) {
    setExercises(exercises.map((exercise, i) => 
      i === index ? { ...exercise, [field]: value } : exercise
    ));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Workout Name
        </label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          required
        />
      </div>

      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg relative">
            <button
              type="button"
              onClick={() => removeExercise(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Sets
                </label>
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  min="1"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Weight (kg) - Optional
                </label>
                <input
                  type="number"
                  value={exercise.weight || ''}
                  onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addExercise}
          className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md font-medium flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Exercise</span>
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !workoutName || exercises.length === 0}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            <Save className="h-5 w-5" />
            <span>Save Workout</span>
          </>
        )}
      </button>
    </form>
  );
}