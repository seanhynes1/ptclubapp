import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Loader2 } from 'lucide-react';

export function TrackingForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    workoutCompleted: false,
    caloriesConsumed: '',
    notes: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      await supabase.from('tracking_entries').insert({
        user_id: user.id,
        date: new Date().toISOString(),
        weight: parseFloat(formData.weight),
        workout_completed: formData.workoutCompleted,
        calories_consumed: parseInt(formData.caloriesConsumed),
        notes: formData.notes
      });

      setFormData({
        weight: '',
        workoutCompleted: false,
        caloriesConsumed: '',
        notes: ''
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Weight (kg)
        </label>
        <input
          type="number"
          step="0.1"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.workoutCompleted}
          onChange={(e) => setFormData({ ...formData, workoutCompleted: e.target.checked })}
          className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600"
        />
        <label className="ml-2 text-sm text-gray-200">
          Workout Completed
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Calories Consumed
        </label>
        <input
          type="number"
          value={formData.caloriesConsumed}
          onChange={(e) => setFormData({ ...formData, caloriesConsumed: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          rows={3}
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
            <Save className="h-5 w-5" />
            <span>Save Entry</span>
          </>
        )}
      </button>
    </form>
  );
}