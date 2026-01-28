# Leaderboard Fix Instructions

## Problem
The leaderboard was not showing user names because it was trying to use admin API which doesn't work from the client side.

## Solution
Added a `user_name` column to the `user_progress` table to store user names directly.

## Setup Instructions

### Step 1: Update Database Schema
Run this SQL in your Supabase SQL Editor:

```sql
-- Add user_name column to user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Set default for existing NULL values
UPDATE user_progress 
SET user_name = 'Anonymous User'
WHERE user_name IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_points 
ON user_progress(total_points DESC);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id 
ON user_progress(user_id);
```

### Step 2: Update Existing User Records

You have two options:

#### Option A: Automatic Update (Recommended)
Users' names will be automatically updated when they log in to the dashboard. The system will:
1. Fetch their name from auth metadata
2. Update their `user_progress` record with their name

#### Option B: Manual Update via Supabase Dashboard
1. Go to Supabase Dashboard → Table Editor → user_progress
2. For each user record, manually update the `user_name` column with their actual name
3. You can find user names in: Authentication → Users → user_metadata → full_name

### Step 3: Verify the Fix
1. Log in to your application
2. Navigate to the Leaderboard page
3. You should now see user names displayed correctly

## What Changed

### Files Modified:
1. **client/src/pages/Leaderboard.js**
   - Removed admin API call
   - Now fetches `user_name` directly from `user_progress` table

2. **client/src/services/progressService.js**
   - Updated `getUserProgress()` to include user name when creating new progress records

3. **client/src/pages/Dashboard.js**
   - Added call to `updateCurrentUserName()` on dashboard load
   - Ensures user name is always up-to-date

### Files Created:
1. **client/src/utils/updateUserNames.js**
   - Utility functions to update user names
   - `updateCurrentUserName()` - Updates current logged-in user's name
   - `updateAllUserNames()` - Batch update (for future use)

2. **database_migration_add_user_name.sql**
   - SQL migration script for database changes

## Testing
1. Complete a module to ensure progress is tracked
2. Check the leaderboard to see if your name appears
3. Have your friend log in and check if their name appears

## Notes
- New users will automatically have their names stored when they first access the dashboard
- Existing users will have their names updated when they next log in
- If a user doesn't have a full_name in their metadata, they'll show as "Anonymous User"
