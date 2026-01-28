// Utility script to update existing user_progress records with user names
// Run this once to migrate existing data

import { supabase } from '../services/supabase';

export const updateAllUserNames = async () => {
  try {
    console.log('Starting user name migration...');

    // Get all user_progress records
    const { data: progressRecords, error: fetchError } = await supabase
      .from('user_progress')
      .select('user_id, user_name');

    if (fetchError) {
      console.error('Error fetching progress records:', fetchError);
      return;
    }

    console.log(`Found ${progressRecords.length} user progress records`);

    // Update each record that doesn't have a user_name
    for (const record of progressRecords) {
      if (!record.user_name || record.user_name === 'Anonymous User') {
        try {
          // Get the current user if this is their record
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user && user.id === record.user_id) {
            const userName = user.user_metadata?.full_name || 'Anonymous User';
            
            const { error: updateError } = await supabase
              .from('user_progress')
              .update({ user_name: userName })
              .eq('user_id', record.user_id);

            if (updateError) {
              console.error(`Error updating user ${record.user_id}:`, updateError);
            } else {
              console.log(`Updated user ${record.user_id} with name: ${userName}`);
            }
          }
        } catch (err) {
          console.error(`Error processing user ${record.user_id}:`, err);
        }
      }
    }

    console.log('User name migration completed!');
  } catch (error) {
    console.error('Migration error:', error);
  }
};

// Function to update current user's name in their progress record
export const updateCurrentUserName = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user logged in');
      return;
    }

    const userName = user.user_metadata?.full_name || 'Anonymous User';
    
    const { error } = await supabase
      .from('user_progress')
      .update({ user_name: userName })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating user name:', error);
    } else {
      console.log('User name updated successfully:', userName);
    }
  } catch (error) {
    console.error('Error updating current user name:', error);
  }
};
