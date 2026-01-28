-- Migration: Add user_name column to user_progress table
-- This allows the leaderboard to display user names without requiring admin API access

-- Step 1: Add user_name column to user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Step 2: Update existing records with user names from auth.users metadata
-- Note: This needs to be run manually in Supabase SQL Editor as it accesses auth.users
-- You can also update records individually through the Supabase dashboard

-- Example update query (run this for each user or adapt as needed):
-- UPDATE user_progress 
-- SET user_name = 'User Full Name'
-- WHERE user_id = 'user-uuid-here';

-- Step 3: Set a default for NULL values
UPDATE user_progress 
SET user_name = 'Anonymous User'
WHERE user_name IS NULL;

-- Optional: Add an index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_progress_points 
ON user_progress(total_points DESC);

-- Optional: Add an index for user lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id 
ON user_progress(user_id);
