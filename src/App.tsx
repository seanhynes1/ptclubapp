import React, { useState } from 'react';
import { AuthForm } from './components/auth/AuthForm';
import { TrackingForm } from './components/tracking/TrackingForm';
import { TrackingHistory } from './components/tracking/TrackingHistory';
import { AnalyticsTab } from './components/analytics/AnalyticsTab';
import { WorkoutTab } from './components/workouts/WorkoutTab';
import { GoalsTab } from './components/goals/GoalsTab';
import { Header } from './components/layout/Header';
import { useAuth } from './hooks/useAuth';
import { LineChart, ClipboardList, Dumbbell, Target } from 'lucide-react';

type TabType = 'tracking' | 'analytics' | 'workouts' | 'goals';

function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('tracking');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {user ? (
          <div className="max-w-4xl mx-auto">
            <Header />

            <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
              <TabButton
                active={activeTab === 'tracking'}
                onClick={() => setActiveTab('tracking')}
                icon={<ClipboardList className="h-5 w-5" />}
                label="Tracking"
              />
              <TabButton
                active={activeTab === 'analytics'}
                onClick={() => setActiveTab('analytics')}
                icon={<LineChart className="h-5 w-5" />}
                label="Analytics"
              />
              <TabButton
                active={activeTab === 'workouts'}
                onClick={() => setActiveTab('workouts')}
                icon={<Dumbbell className="h-5 w-5" />}
                label="Workouts"
              />
              <TabButton
                active={activeTab === 'goals'}
                onClick={() => setActiveTab('goals')}
                icon={<Target className="h-5 w-5" />}
                label="Goals"
              />
            </div>

            <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
              {activeTab === 'tracking' ? (
                <>
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Track Today's Progress
                  </h2>
                  <TrackingForm userId={user.uid} />
                  <div className="mt-8">
                    <TrackingHistory userId={user.uid} />
                  </div>
                </>
              ) : activeTab === 'analytics' ? (
                <AnalyticsTab userId={user.uid} />
              ) : activeTab === 'workouts' ? (
                <WorkoutTab userId={user.uid} />
              ) : (
                <GoalsTab userId={user.uid} />
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
            <AuthForm />
          </div>
        )}
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default App;