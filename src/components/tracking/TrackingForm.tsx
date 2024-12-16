import React, { useState } from 'react';
import { addTrackingEntry } from '../../services/tracking';
import { Save, Loader2, Calendar } from 'lucide-react';
import { TrackingInput } from './TrackingInput';
import { format } from 'date-fns';

export function TrackingForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    weight: '',
    workoutCompleted: false,
    caloriesConsumed: '',
    notes: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await addTrackingEntry(userId, {
        date: new Date(formData.date),
        weight: parseFloat(formData.weight),
        workout_completed: formData.workoutCompleted,
        calories_consumed: parseInt(formData.caloriesConsumed),
        notes: formData.notes || undefined
      });

      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
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
          Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white pr-10"
            max={format(new Date(), 'yyyy-MM-dd')}
            required
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <TrackingInput
        type="number"
        label="Weight (kg)"
        value={formData.weight}
        onChange={(value) => setFormData({ ...formData, weight: value })}
        step="0.1"
        required
      />

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

      <TrackingInput
        type="number"
        label="Calories Consumed"
        value={formData.caloriesConsumed}
        onChange={(value) => setFormData({ ...formData, caloriesConsumed: value })}
        required
      />

      <TrackingInput
        type="textarea"
        label="Notes"
        value={formData.notes}
        onChange={(value) => setFormData({ ...formData, notes: value })}
      />

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