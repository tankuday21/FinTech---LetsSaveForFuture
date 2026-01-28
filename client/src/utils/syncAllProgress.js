// Utility to sync progress for all users who have completed modules
// This is useful for fixing missing leaderboard entries

import { supabase } from '../services/supabase';

export const syncCurrentUserProgress = async () => {
  try {
    console.log('Syncing current user progress...');

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user logged in');
      return;
    }

    // Get all completed modules for this user
    const { data: completions, error: completionsError } = await supabase
      .from('module_completions')
      .select('points_earned')
      .eq('user_id', user.id)
      .eq('completed', true);

    if (completionsError) {
      console.error('Error fetching completions:', completionsError);
      return;
    }

    console.log(`Found ${completions.length} completed modules`);

    // Calculate totals
    const totalPoints = completions.reduce((sum, c) => sum + (c.points_earned || 0), 0);
    const modulesCompleted = completions.length;
    const userName = user.user_metadata?.full_name || 'Anonymous User';

    // Update or insert user progress
    const { error: updateError } = await supabase
      .from('user_progress')
      .upsert([
        {
          user_id: user.id,
          user_name: userName,
          total_points: totalPoints,
          modules_completed: modulesCompleted,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: new Date().toISOString()
        }
      ], {
        onConflict: 'user_id'
      });

    if (updateError) {
      console.error('Error updating progress:', updateError);
      return;
    }

    console.log(`✅ Progress synced: ${modulesCompleted} modules, ${totalPoints} points`);
    console.log(`User: ${userName}`);
    
    return {
      success: true,
      userName,
      modulesCompleted,
      totalPoints
    };
  } catch (error) {
    console.error('Error syncing progress:', error);
    return { success: false, error };
  }
};

// Call this function from browser console to sync progress
// Usage: window.syncMyProgress()
if (typeof window !== 'undefined') {
  window.syncMyProgress = syncCurrentUserProgress;
}
