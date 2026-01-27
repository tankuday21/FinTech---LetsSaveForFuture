# Supabase Database Setup for Progress Tracking

## Step 1: Create Tables in Supabase

Go to your Supabase Dashboard → SQL Editor and run these queries:

### 1. User Progress Table

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

-- Create policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

### 2. Module Completion Table

```sql
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

-- Create policies
CREATE POLICY "Users can view own completions"
  ON module_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions"
  ON module_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completions"
  ON module_completions FOR UPDATE
  USING (auth.uid() = user_id);
```

### 3. Create Function to Update Progress

```sql
-- Function to update user progress when module is completed
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

## Step 2: Verify Tables Created

Run this query to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_progress', 'module_completions');
```

You should see both tables listed.

## Step 3: Test Data (Optional)

Insert test data to verify:

```sql
-- This will be done automatically by the app, but you can test manually
INSERT INTO user_progress (user_id, total_points, modules_completed)
VALUES (auth.uid(), 0, 0);
```

## Done!

Your database is now ready to track:
- ✅ Module completions
- ✅ Quiz scores
- ✅ Points earned
- ✅ Total progress

The app will automatically:
1. Save progress when you complete a module
2. Unlock next modules based on completion
3. Track your points and XP
4. Show your progress on dashboard
