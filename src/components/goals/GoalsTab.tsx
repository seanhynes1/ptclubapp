import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getUserGoals, deleteGoal } from '../../services/goals';
import { Goal } from '../../types/goal';
import { GoalList } from './GoalList';
import { GoalCreatorModal } from './GoalCreatorModal';
import { GoalsEmptyState } from './GoalsEmptyState';

export function GoalsTab({ userId }: { userId: string }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  async function loadGoals() {
    try {
      const userGoals = await getUserGoals(userId);
      setGoals(userGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGoals();
  }, [userId]);

  async function handleDelete(goalId: string) {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
      await deleteGoal(goalId);
      await loadGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }

  function handleEdit(goal: Goal) {
    setEditingGoal(goal);
    setIsCreatorOpen(true);
  }

  if (loading) {
    return <div className="text-center text-gray-400">Loading goals...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Your Goals</h2>
        <button
          onClick={() => setIsCreatorOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Plus className="h-5 w-5 text-white" />
          <span>Set New Goal</span>
        </button>
      </div>

      {goals.length === 0 ? (
        <GoalsEmptyState onCreateClick={() => setIsCreatorOpen(true)} />
      ) : (
        <GoalList
          goals={goals}
          onGoalsUpdate={loadGoals}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <GoalCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => {
          setIsCreatorOpen(false);
          setEditingGoal(null);
        }}
        userId={userId}
        goal={editingGoal}
        onGoalCreated={() => {
          loadGoals();
          setIsCreatorOpen(false);
          setEditingGoal(null);
        }}
      />
    </div>
  );
}