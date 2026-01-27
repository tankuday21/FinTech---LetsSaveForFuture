import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { 
  HiTrophy, 
  HiStar, 
  HiUser,
  HiArrowLeft,
  HiFire,
  HiAcademicCap
} from 'react-icons/hi2';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadLeaderboard = React.useCallback(async () => {
    try {
      setLoading(true);

      // Get all users with their progress
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          user_id,
          total_points,
          modules_completed,
          current_streak,
          longest_streak
        `)
        .order('total_points', { ascending: false })
        .limit(100);

      if (error) throw error;

      // Get user details for each entry
      const leaderboardWithUsers = await Promise.all(
        data.map(async (entry, index) => {
          const { data: userData } = await supabase.auth.admin.getUserById(entry.user_id);
          return {
            ...entry,
            rank: index + 1,
            name: userData?.user?.user_metadata?.full_name || 'Anonymous User',
            email: userData?.user?.email || '',
            isCurrentUser: entry.user_id === user?.id
          };
        })
      );

      setLeaderboardData(leaderboardWithUsers);

      // Find current user's rank
      const currentUserEntry = leaderboardWithUsers.find(entry => entry.user_id === user?.id);
      if (currentUserEntry) {
        setUserRank(currentUserEntry.rank);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-500';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-white hover:text-primary-100 transition-colors mb-4"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                🏆 Leaderboard
              </h1>
              <p className="text-primary-100">
                See how you rank against other learners
              </p>
            </div>
            {userRank && (
              <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-sm text-primary-100 mb-1">Your Rank</p>
                <p className="text-3xl font-bold">#{userRank}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Podium */}
        {leaderboardData.length >= 3 && (
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="flex flex-col items-center pt-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 border-4 border-gray-400">
                  <HiUser className="w-10 h-10 text-gray-600" />
                </div>
                <div className="text-4xl mb-2">🥈</div>
                <h3 className="font-semibold text-gray-900 text-center mb-1">
                  {leaderboardData[1].name}
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-1">
                  {leaderboardData[1].total_points}
                </p>
                <p className="text-xs text-gray-600">points</p>
                <div className="mt-2 bg-gray-100 rounded-lg px-4 py-6 w-full text-center">
                  <p className="text-sm text-gray-600">{leaderboardData[1].modules_completed} modules</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-3 border-4 border-yellow-400 shadow-lg">
                  <HiUser className="w-12 h-12 text-yellow-600" />
                </div>
                <div className="text-5xl mb-2">🥇</div>
                <h3 className="font-bold text-gray-900 text-center mb-1 text-lg">
                  {leaderboardData[0].name}
                </h3>
                <p className="text-3xl font-bold text-yellow-600 mb-1">
                  {leaderboardData[0].total_points}
                </p>
                <p className="text-xs text-gray-600">points</p>
                <div className="mt-2 bg-yellow-100 rounded-lg px-4 py-8 w-full text-center">
                  <p className="text-sm text-gray-600">{leaderboardData[0].modules_completed} modules</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center pt-12">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3 border-4 border-orange-400">
                  <HiUser className="w-10 h-10 text-orange-600" />
                </div>
                <div className="text-4xl mb-2">🥉</div>
                <h3 className="font-semibold text-gray-900 text-center mb-1">
                  {leaderboardData[2].name}
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-1">
                  {leaderboardData[2].total_points}
                </p>
                <p className="text-xs text-gray-600">points</p>
                <div className="mt-2 bg-orange-100 rounded-lg px-4 py-6 w-full text-center">
                  <p className="text-sm text-gray-600">{leaderboardData[2].modules_completed} modules</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Learner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modules
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Streak
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((entry) => (
                  <tr 
                    key={entry.user_id}
                    className={`${entry.isCurrentUser ? 'bg-primary-50' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getMedalIcon(entry.rank) && (
                          <span className="text-2xl">{getMedalIcon(entry.rank)}</span>
                        )}
                        <span className={`text-lg font-bold ${getRankColor(entry.rank)}`}>
                          #{entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <HiUser className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {entry.name}
                            {entry.isCurrentUser && (
                              <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <HiStar className="w-5 h-5 text-yellow-500" />
                        <span className="text-lg font-semibold text-gray-900">
                          {entry.total_points}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <HiAcademicCap className="w-5 h-5 text-green-500" />
                        <span className="text-gray-900">
                          {entry.modules_completed}/24
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <HiFire className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-900">
                          {entry.current_streak} days
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leaderboardData.length === 0 && (
            <div className="text-center py-12">
              <HiTrophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No learners yet</p>
              <p className="text-sm text-gray-400">Be the first to complete a module!</p>
            </div>
          )}
        </div>

        {/* Motivational Message */}
        {userRank && userRank > 3 && (
          <div className="mt-6 bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
            <p className="text-primary-900 font-medium mb-2">
              💪 Keep learning to climb the ranks!
            </p>
            <p className="text-sm text-primary-700">
              Complete more modules to earn points and improve your position.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
