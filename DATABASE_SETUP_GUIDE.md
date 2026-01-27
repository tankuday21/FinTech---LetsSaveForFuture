# 🎯 Database Setup Guide - Progress Tracking System

## ✅ What We've Built

Your FinLearn platform now has a complete progress tracking system that:
- ✅ Saves module completions to Supabase database
- ✅ Tracks quiz scores and points earned
- ✅ Unlocks modules sequentially (complete Module 2 → unlock Module 3)
- ✅ Shows real-time progress on Dashboard and Learn pages
- ✅ Displays total points and completion percentage

## 🚀 Setup Steps (5 minutes)

### Step 1: Open Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project (the one you're using for FinLearn)
3. Click on **SQL Editor** in the left sidebar

### Step 2: Create Database Tables

Copy and paste this SQL query into the SQL Editor and click **RUN**:

```sql
-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  modules_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create module_completions table
CREATE TABLE module_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  quiz_score INTEGER,
  quiz_total INTEGER,
  points_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Enable Row Level Security
ALTER TABLE module_completions ENABLE ROW LEVEL SECURITY;

-- Create policies for module_completions
CREATE POLICY "Users can view own completions"
  ON module_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions"
  ON module_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completions"
  ON module_completions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update user progress
CREATE OR REPLACE FUNCTION update_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert user progress
  INSERT INTO user_progress (user_id, total_points, modules_completed)
  VALUES (
    NEW.user_id,
    NEW.points_earned,
    1
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_points = user_progress.total_points + NEW.points_earned,
    modules_completed = user_progress.modules_completed + 1,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_module_completion
  AFTER INSERT OR UPDATE OF completed ON module_completions
  FOR EACH ROW
  WHEN (NEW.completed = TRUE)
  EXECUTE FUNCTION update_user_progress();
```

### Step 3: Verify Tables Created

Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_progress', 'module_completions');
```

You should see both tables listed! ✅

### Step 4: Test Your App

1. **Restart your development server** (if running):
   ```bash
   cd client
   npm start
   ```

2. **Login to your app** at http://localhost:3000

3. **Go to Learn page** - You should see:
   - Your current progress (0/24 modules)
   - 0 points earned
   - Modules 1 & 2 unlocked, rest locked

4. **Complete Module 1**:
   - Click "Start Learning" on Module 1
   - Read through all sections
   - Take the quiz (need 70% to pass)
   - Pass the quiz → See "+100 Points Earned!"

5. **Check Progress**:
   - Go back to Learn page
   - Module 1 should show green checkmark ✅
   - Module 3 should now be unlocked! 🎉
   - Progress should show "1/24 modules"
   - Points should show "100"

6. **Check Dashboard**:
   - Go to Dashboard
   - See your stats: Total Points, Modules Completed, Progress %

## 🎉 How It Works

### Module Unlocking Logic:
- **Modules 1 & 2**: Always unlocked (starting modules)
- **Module 3**: Unlocks when Module 2 is completed
- **Module 4**: Unlocks when Module 3 is completed
- And so on... (sequential unlocking)

### Points System:
- Each module has different points (100-350 points)
- Points are awarded when you pass the quiz (70%+ score)
- Total possible points: 5,000 across all 24 modules

### Database Tables:

**user_progress**:
- Tracks your total points
- Tracks total modules completed
- One row per user

**module_completions**:
- Tracks each module you complete
- Stores quiz score and points earned
- One row per module per user

## 🐛 Troubleshooting

### Issue: "Module 3 still locked after completing Module 2"

**Solution**: Check if quiz was passed (70%+). Only passing the quiz unlocks next module.

### Issue: "Points not updating"

**Solution**: 
1. Check browser console for errors
2. Verify tables were created in Supabase
3. Check if RLS policies are enabled

### Issue: "Error: relation 'user_progress' does not exist"

**Solution**: Run the SQL queries in Step 2 again in Supabase SQL Editor

## 📊 View Your Data in Supabase

To see your progress data:

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select `user_progress` or `module_completions`
4. See all your saved data!

## 🚀 Next Steps

Your progress tracking is now fully functional! You can:
- Complete all 24 modules
- Earn all 5,000 points
- Track your learning journey
- See your progress grow on the dashboard

## 💡 Pro Tips

1. **Complete modules in order** for the best learning experience
2. **Aim for 100% on quizzes** to maximize learning
3. **Review modules** even after completion (green checkmark modules are still accessible)
4. **Check Dashboard regularly** to see your progress stats

---

**Need Help?** Check the browser console (F12) for any error messages.

**Database Issues?** Verify tables exist in Supabase Table Editor.

**Still Stuck?** Make sure your `.env` file has correct Supabase credentials.
