import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProgress, getModuleCompletions } from '../services/progressService';
import { supabase } from '../services/supabase';
import { 
  HiUser, 
  HiMail, 
  HiCalendar, 
  HiTrophy, 
  HiAcademicCap,
  HiStar,
  HiChartBar,
  HiCheckCircle,
  HiClock,
  HiPencil,
  HiArrowLeft,
  HiShieldCheck
} from 'react-icons/hi2';

const Profile = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState({ total_points: 0, modules_completed: 0 });
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        const [progress, completions] = await Promise.all([
          getUserProgress(user.id),
          getModuleCompletions(user.id)
        ]);

        setUserProgress(progress);
        setCompletedModules(completions);
        setFullName(user.user_metadata?.full_name || '');
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!fullName.trim()) return;

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) throw error;

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getAchievementLevel = () => {
    const completed = userProgress.modules_completed;
    if (completed >= 24) return { title: 'Financial Master', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (completed >= 18) return { title: 'Expert Learner', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (completed >= 12) return { title: 'Advanced Student', color: 'text-green-600', bg: 'bg-green-100' };
    if (completed >= 6) return { title: 'Intermediate Learner', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (completed >= 1) return { title: 'Beginner', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { title: 'New Learner', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const achievement = getAchievementLevel();
  const progressPercentage = Math.round((userProgress.modules_completed / 24) * 100);
  const averageScore = completedModules.length > 0
    ? Math.round(
        completedModules.reduce((sum, m) => sum + (m.quiz_score / m.quiz_total) * 100, 0) / 
        completedModules.length
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-display font-bold text-gray-900">
            My Profile
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <HiUser className="w-12 h-12 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
                  {user?.user_metadata?.full_name || 'User'}
                </h2>
                <div className={`px-3 py-1 rounded-full ${achievement.bg} ${achievement.color} text-sm font-semibold`}>
                  {achievement.title}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <HiMail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900 break-all">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HiCalendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Member Since</p>
                    <p className="text-sm text-gray-900">{formatDate(user?.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HiShieldCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Account Status</p>
                    <p className="text-sm text-green-600 font-medium">Active</p>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <HiPencil className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Profile</span>
              </button>
            </div>

            {/* Edit Profile Form */}
            {isEditing && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={saving || !fullName.trim()}
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFullName(user?.user_metadata?.full_name || '');
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <HiStar className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-3xl font-bold text-primary-600">
                    {userProgress.total_points}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Total Points</h3>
                <p className="text-xs text-gray-500 mt-1">Out of 5,000 possible</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <HiAcademicCap className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-3xl font-bold text-green-600">
                    {userProgress.modules_completed}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Modules Completed</h3>
                <p className="text-xs text-gray-500 mt-1">Out of 24 total modules</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiChartBar className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-3xl font-bold text-blue-600">
                    {progressPercentage}%
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Overall Progress</h3>
                <p className="text-xs text-gray-500 mt-1">Course completion rate</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <HiTrophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-3xl font-bold text-yellow-600">
                    {averageScore}%
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Average Quiz Score</h3>
                <p className="text-xs text-gray-500 mt-1">Across all completed modules</p>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Course Completion</span>
                    <span className="text-sm font-semibold text-primary-600">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <HiCheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{userProgress.modules_completed}</p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <HiClock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{24 - userProgress.modules_completed}</p>
                      <p className="text-xs text-gray-600">Remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {completedModules.length > 0 ? (
                <div className="space-y-3">
                  {completedModules
                    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
                    .slice(0, 5)
                    .map((module) => (
                      <div
                        key={module.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <HiCheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Module {module.module_id} Completed
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(module.completed_at)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary-600">
                            +{module.points_earned} pts
                          </p>
                          <p className="text-xs text-gray-500">
                            {module.quiz_score}/{module.quiz_total}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HiAcademicCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No completed modules yet</p>
                  <Link
                    to="/learn"
                    className="inline-block mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Start Learning →
                  </Link>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg text-center ${userProgress.modules_completed >= 1 ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200 opacity-50'}`}>
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-xs font-semibold text-gray-900">First Steps</p>
                  <p className="text-xs text-gray-600">Complete 1 module</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${userProgress.modules_completed >= 6 ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200 opacity-50'}`}>
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="text-xs font-semibold text-gray-900">Rising Star</p>
                  <p className="text-xs text-gray-600">Complete 6 modules</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${userProgress.modules_completed >= 12 ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200 opacity-50'}`}>
                  <div className="text-3xl mb-2">💪</div>
                  <p className="text-xs font-semibold text-gray-900">Half Way</p>
                  <p className="text-xs text-gray-600">Complete 12 modules</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${userProgress.modules_completed >= 24 ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200 opacity-50'}`}>
                  <div className="text-3xl mb-2">👑</div>
                  <p className="text-xs font-semibold text-gray-900">Master</p>
                  <p className="text-xs text-gray-600">Complete all 24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
