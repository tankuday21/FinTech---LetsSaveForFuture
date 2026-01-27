import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services/supabase';
import { HiTrophy, HiChartBar, HiArrowRightOnRectangle, HiAcademicCap } from 'react-icons/hi2';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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
              <span className="text-sm text-gray-700">
                {user?.user_metadata?.full_name || user?.email}
              </span>
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

        {/* Dashboard content will be added here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <HiTrophy className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Challenges
            </h3>
            <p className="text-gray-600 text-sm">
              Coming soon...
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <HiChartBar className="w-6 h-6 text-green-600" />
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
