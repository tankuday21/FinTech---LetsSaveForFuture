# 🚀 Quick Start - Get Your Progress Tracking Working in 5 Minutes!

## Step 1: Open Supabase (1 minute)

1. Go to: https://supabase.com/dashboard
2. Click on your FinLearn project
3. Click **SQL Editor** in the left sidebar

## Step 2: Run This SQL (2 minutes)

Copy this entire block and click **RUN**:

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

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

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

ALTER TABLE module_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own completions" ON module_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completions" ON module_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own completions" ON module_completions FOR UPDATE USING (auth.uid() = user_id);

-- Create trigger function
CREATE OR REPLACE FUNCTION update_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_progress (user_id, total_points, modules_completed)
  VALUES (NEW.user_id, NEW.points_earned, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_points = user_progress.total_points + NEW.points_earned,
    modules_completed = user_progress.modules_completed + 1,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_module_completion
  AFTER INSERT OR UPDATE OF completed ON module_completions
  FOR EACH ROW
  WHEN (NEW.completed = TRUE)
  EXECUTE FUNCTION update_user_progress();
```

✅ You should see "Success. No rows returned"

## Step 3: Verify (30 seconds)

Run this to check:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_progress', 'module_completions');
```

✅ You should see both table names!

## Step 4: Test Your App (1 minute)

1. Go to https://fin-learn.vercel.app/ (or localhost:3000)
2. Login
3. Go to **Learn** page
4. You should see:
   - "0/24 Modules Completed"
   - "0 Points Earned"
   - Modules 1 & 2 unlocked
   - Modules 3-24 locked 🔒

## Step 5: Complete a Module! (5 minutes)

1. Click **Start Learning** on Module 1
2. Read through all sections (click Next)
3. Take the quiz
4. Get 70%+ to pass
5. See "**+100 Points Earned!**" 🎉

## Step 6: See the Magic! ✨

Go back to **Learn** page and you'll see:
- ✅ Module 1 has a green checkmark
- 🔓 Module 3 is now unlocked!
- 📊 Progress shows "1/24 modules"
- ⭐ Points show "100"

Go to **Dashboard** and see:
- Total Points: 100
- Modules Completed: 1/24
- Progress: 4%

## 🎉 That's It!

Your progress tracking is now fully working! Complete more modules to:
- Earn more points
- Unlock new modules
- Track your learning journey
- See your stats grow

## 🐛 Troubleshooting

**Module 3 still locked?**
- Make sure you passed the quiz (70%+)
- Check browser console (F12) for errors

**Points not showing?**
- Refresh the page
- Check if SQL queries ran successfully

**Error messages?**
- Verify tables exist in Supabase Table Editor
- Check your .env file has correct Supabase credentials

## 📚 More Info

- Full details: `DATABASE_SETUP_GUIDE.md`
- Implementation details: `PROGRESS_TRACKING_IMPLEMENTATION.md`
- SQL queries: `SUPABASE_DATABASE_SETUP.md`

---

**Happy Learning! 🚀**
