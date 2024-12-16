import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { createGoal, updateGoal } from '../../services/goals';
import { GoalType, Goal } from '../../types/goal';

interface GoalCreatorProps {
  userId: string;
  goal?: Goal | null;
  onGoalCreated: () => void;
}

export function GoalCreator({ userId, goal, onGoalCreated }: GoalCreatorProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'workout_count' as GoalType,
    target: '',
    reward: '',
    deadline: ''
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        type: goal.type,
        target: goal.target.toString(),
        reward: goal.reward,
        deadline: goal.deadline.toDate().toISOString().split('T')[0]
      });
    }
  }, [goal]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (goal) {
        await updateGoal(goal.id, {
          type: formData.type,
          target: parseFloat(formData.target),
          reward: formData.reward,
          deadline: new Date(formData.deadline)
        });
      } else {
        await createGoal(userId, {
          type: formData.type,
          target: parseFloat(formData.target),
          reward: formData.reward,
          deadline: new Date(formData.deadline)
        });
      }
      onGoalCreated();
    } catch (error) {
      console.error('Error saving goal:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Goal Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as GoalType })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          required
        >
          <option value="workout_count">Complete Workouts</option>
          <option value="weight_change">Weight Change</option>
          <option value="calorie_target">Daily Calorie Target</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Target {formData.type === 'workout_count' ? '(workouts)' : 
                 formData.type === 'weight_change' ? '(kg)' : 
                 '(calories)'}
        </label>
        <input
          type="number"
          value={formData.target}
          onChange={(e) => setFormData({ ...formData, target: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          step={formData.type === 'weight_change' ? '0.1' : '1'}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Reward
        </label>
        <input
          type="text"
          value={formData.reward}
          onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          placeholder="e.g., Night out, New workout gear"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Deadline
        </label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            <Save className="h-5 w-5 text-white" />
            <span>{goal ? 'Update Goal' : 'Set Goal'}</span>
          </>
        )}
      </button>
    </form>
  );
}