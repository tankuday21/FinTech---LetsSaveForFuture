import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
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
    <div className="min-h-screen">
      <VersionBadge />
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b-2 border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center">
                <img src={logo} alt="FinLearn" className="h-14 w-auto rounded-lg shadow-sm" />
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-bold text-gray-900 bg-green-50 rounded-xl border-2 border-green-100 transition-colors"
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
                className="flex items-center space-x-2 px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl border-2 border-transparent hover:border-gray-100 transition-all"
              >
                <HiUser className="w-5 h-5 text-gray-400" />
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
          {/* Total Points Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-yellow-400 shadow-[0_4px_0_0_#EAB308] transform transition-all hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">Total Points</p>
                <p className="text-4xl font-display font-bold text-yellow-500">
                  {loading ? '...' : userProgress.total_points}
                </p>
              </div>
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center border-2 border-yellow-200">
                <HiStar className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="mt-3 text-xs font-bold text-yellow-600 bg-yellow-50 inline-block px-3 py-1 rounded-lg">
              Keep earning! 🎯
            </div>
          </div>

          {/* Modules Completed Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-400 shadow-[0_4px_0_0_#22C55E] transform transition-all hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">Modules Done</p>
                <p className="text-4xl font-display font-bold text-green-500">
                  {loading ? '...' : `${userProgress.modules_completed}/24`}
                </p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center border-2 border-green-200">
                <HiAcademicCap className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="mt-3 text-xs font-bold text-green-600 bg-green-50 inline-block px-3 py-1 rounded-lg">
              You're doing great! 🌟
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-400 shadow-[0_4px_0_0_#A855F7] transform transition-all hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">Progress</p>
                <p className="text-4xl font-display font-bold text-purple-500">
                  {loading ? '...' : `${Math.round((userProgress.modules_completed / 24) * 100)}%`}
                </p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center border-2 border-purple-200">
                <HiChartBar className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="mt-3 text-xs text-purple-600 font-medium">
              Almost there! 🚀
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-orange-400 shadow-[0_4px_0_0_#F97316] transform transition-all hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-500 mb-1">Current Streak</p>
                <p className="text-4xl font-display font-bold text-orange-500">
                  {loading ? '...' : userProgress.current_streak || 0}
                </p>
              </div>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center border-2 border-orange-200 animate-pulse">
                <span className="text-4xl">🔥</span>
              </div>
            </div>
            <div className="mt-3 text-xs font-bold text-orange-600 bg-orange-50 inline-block px-3 py-1 rounded-lg">
              Best: {userProgress.longest_streak || 0} days 💪
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/learn" className="group bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 border-2 border-blue-400 hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiAcademicCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Start Adventure
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              24 fun modules waiting! 📚
            </p>
            <div className="flex items-center text-white text-sm font-bold">
              <span>Let's go!</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <Link to="/leaderboard" className="group bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 border-2 border-yellow-300 hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiTrophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Leaderboard
            </h3>
            <p className="text-yellow-100 text-sm mb-4">
              Compete with others! 🏆
            </p>
            <div className="flex items-center text-white text-sm font-bold">
              <span>View ranks</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <Link to="/calculators" className="group bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl shadow-lg p-6 border-2 border-green-300 hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-1">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiCalculator className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Calculators
            </h3>
            <p className="text-green-100 text-sm mb-4">
              Plan your finances! 🧮
            </p>
            <div className="flex items-center text-white text-sm font-bold">
              <span>Calculate</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <Link to="/simulation" className="group bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-lg p-6 border-2 border-pink-300 hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HiChartBar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Simulations
            </h3>
            <p className="text-pink-100 text-sm mb-4">
              Live your financial life! 🎮
            </p>
            <div className="flex items-center text-white text-sm font-bold">
              <span>Start playing</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
