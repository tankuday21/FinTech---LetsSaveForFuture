import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services/supabase';
import { HiTrophy, HiChartBar, HiArrowRightOnRectangle, HiAcademicCap, HiStar, HiUser, HiCalculator } from 'react-icons/hi2';
import { getUserProgress } from '../services/progressService';
import VersionBadge from '../components/VersionBadge';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState({ total_points: 0, modules_completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;
      
      try {
        const progress = await getUserProgress(user.id);
        setUserProgress(progress);
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VersionBadge />
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-display font-bold text-primary-600">
                FinLearn
              </h1>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/learn"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Learn
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <HiUser className="w-4 h-4" />
                <span className="hidden sm:inline">{user?.user_metadata?.full_name || 'Profile'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                <HiArrowRightOnRectangle className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            Ready to continue your financial learning journey?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Points</p>
                <p className="text-3xl font-bold text-primary-600">
                  {loading ? '...' : userProgress.total_points}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <HiStar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Modules Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {loading ? '...' : `${userProgress.modules_completed}/24`}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <HiAcademicCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Progress</p>
                <p className="text-3xl font-bold text-accent-600">
                  {loading ? '...' : `${Math.round((userProgress.modules_completed / 24) * 100)}%`}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <HiChartBar className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>

          {/* Streak Card - Compact Version */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-sm p-6 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Current Streak</p>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-1">
              {loading ? '...' : userProgress.current_streak || 0}
            </p>
            <p className="text-xs text-gray-600">
              {userProgress.current_streak === 1 ? 'day' : 'days'} • Best: {userProgress.longest_streak || 0}
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/learn" className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-primary-300 transition-all">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <HiAcademicCap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start Learning
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore 24 modules across 6 levels
            </p>
            <div className="flex items-center text-primary-600 text-sm font-medium">
              <span>Begin your journey</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link to="/leaderboard" className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-accent-300 transition-all">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <HiTrophy className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Leaderboard
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              See how you rank against others
            </p>
            <div className="flex items-center text-accent-600 text-sm font-medium">
              <span>View rankings</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link to="/calculators" className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-green-300 transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <HiCalculator className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Calculators
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              EMI, SIP, and more financial tools
            </p>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <span>Start calculating</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <HiChartBar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Simulations
            </h3>
            <p className="text-gray-600 text-sm">
              Coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
