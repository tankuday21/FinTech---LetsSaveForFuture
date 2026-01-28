import { supabase } from './supabase';

// Get user's overall progress
export const getUserProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    // If no progress exists, create initial record
    if (!data) {
      // Get user's full name from auth metadata
      const { data: { user } } = await supabase.auth.getUser();
      const userName = user?.user_metadata?.full_name || 'Anonymous User';

      const { data: newProgress, error: insertError } = await supabase
        .from('user_progress')
        .insert([
          { 
            user_id: userId, 
            user_name: userName,
            total_points: 0, 
            modules_completed: 0,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: null
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return newProgress;
    }

    return data;
  } catch (error) {
    console.error('Error getting user progress:', error);
    return { 
      total_points: 0, 
      modules_completed: 0,
      current_streak: 0,
      longest_streak: 0,
      last_activity_date: null
    };
  }
};

// Get all module completions for a user
export const getModuleCompletions = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('module_completions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting module completions:', error);
    return [];
  }
};

// Check if a specific module is completed
export const isModuleCompleted = async (userId, moduleId) => {
  try {
    const { data, error } = await supabase
      .from('module_completions')
      .select('completed')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data?.completed || false;
  } catch (error) {
    console.error('Error checking module completion:', error);
    return false;
  }
};

// Mark module as completed
export const completeModule = async (userId, moduleId, quizScore, quizTotal, pointsEarned) => {
  try {
    const { data, error } = await supabase
      .from('module_completions')
      .upsert([
        {
          user_id: userId,
          module_id: moduleId,
          completed: true,
          quiz_score: quizScore,
          quiz_total: quizTotal,
          points_earned: pointsEarned,
          completed_at: new Date().toISOString()
        }
      ], {
        onConflict: 'user_id,module_id'
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error completing module:', error);
    throw error;
  }
};

// Check if user can access a module (based on previous module completion)
export const canAccessModule = async (userId, moduleId) => {
  // Module 1 and 2 are always accessible
  if (moduleId <= 2) return true;

  // For other modules, check if previous module is completed
  const previousModuleId = moduleId - 1;
  return await isModuleCompleted(userId, previousModuleId);
};
