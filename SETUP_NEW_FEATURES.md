# 🚀 Setup Guide for New Features

## Features Added:
1. **🏆 Leaderboard System** - Compete with other learners
2. **🔥 Daily Streak Tracker** - Build learning habits
3. **🧮 Financial Calculators** - EMI, SIP, Emergency Fund, Compound Interest

---

## 📊 Step 1: Update Database (Required for Leaderboard & Streak)

### Open Supabase Dashboard → SQL Editor

Run this SQL query:

```sql
-- Add streak columns to user_progress table
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_date DATE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_points ON user_progress(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_streak ON user_progress(current_streak DESC);

-- Function to update user streak
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_last_activity DATE;
  v_current_streak INTEGER;
  v_longest_streak INTEGER;
  v_today DATE := CURRENT_DATE;
BEGIN
  -- Get current streak data
  SELECT last_activity_date, current_streak, longest_streak
  INTO v_last_activity, v_current_streak, v_longest_streak
  FROM user_progress
  WHERE user_id = p_user_id;

  -- If no previous activity, start streak at 1
  IF v_last_activity IS NULL THEN
    UPDATE user_progress
    SET current_streak = 1,
        longest_streak = 1,
        last_activity_date = v_today
    WHERE user_id = p_user_id;
    RETURN;
  END IF;

  -- If activity is today, do nothing (already counted)
  IF v_last_activity = v_today THEN
    RETURN;
  END IF;

  -- If activity was yesterday, increment streak
  IF v_last_activity = v_today - INTERVAL '1 day' THEN
    v_current_streak := v_current_streak + 1;
    
    -- Update longest streak if current is higher
    IF v_current_streak > v_longest_streak THEN
      v_longest_streak := v_current_streak;
    END IF;

    UPDATE user_progress
    SET current_streak = v_current_streak,
        longest_streak = v_longest_streak,
        last_activity_date = v_today
    WHERE user_id = p_user_id;
  ELSE
    -- Streak broken, reset to 1
    UPDATE user_progress
    SET current_streak = 1,
        last_activity_date = v_today
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Update existing trigger to also update streak
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
  
  -- Update streak
  PERFORM update_user_streak(NEW.user_id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Verify Setup:

```sql
-- Check if columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_progress' 
AND column_name IN ('current_streak', 'longest_streak', 'last_activity_date');
```

You should see all 3 columns! ✅

---

## 🎯 Step 2: Access New Features

### 1. Leaderboard 🏆
- **URL**: `/leaderboard`
- **Access**: Dashboard → Click "Leaderboard" card
- **Features**:
  - Top 3 podium with medals (🥇🥈🥉)
  - Full rankings table
  - Your current rank highlighted
  - Points, modules, and streak display
  - Real-time updates

### 2. Daily Streak 🔥
- **Display**: Dashboard (large widget) & Profile page
- **How it works**:
  - Complete a module today → Streak = 1
  - Complete a module tomorrow → Streak = 2
  - Skip a day → Streak resets to 0
  - Tracks your longest streak ever
- **Milestones**:
  - 7 days 🎯
  - 30 days 🚀
  - 100 days 💪
  - 365 days 👑

### 3. Financial Calculators 🧮
- **URL**: `/calculators`
- **Access**: Dashboard → Click "Calculators" card
- **Tools Available**:

#### EMI Calculator
- Calculate monthly loan payments
- Inputs: Loan amount, interest rate, tenure
- Shows: EMI, total interest, total amount

#### SIP Calculator
- Calculate mutual fund returns
- Inputs: Monthly investment, return rate, years
- Shows: Future value, invested amount, returns

#### Emergency Fund Calculator
- Calculate emergency fund target
- Inputs: Monthly expenses, months of coverage, current savings
- Shows: Target amount, progress, remaining needed

#### Compound Interest Calculator
- Calculate compound interest returns
- Inputs: Principal, rate, time, frequency
- Shows: Final amount, interest earned

---

## 🎨 UI Updates

### Dashboard:
- ✅ 4 stat cards (Points, Modules, Progress, Streak)
- ✅ Large streak display with milestones
- ✅ 4 action cards (Learn, Leaderboard, Calculators, Simulations)

### Navigation:
- ✅ Leaderboard accessible from Dashboard
- ✅ Calculators accessible from Dashboard
- ✅ Profile link in all pages

---

## 🧪 Testing Checklist

### Test Leaderboard:
- [ ] Visit `/leaderboard`
- [ ] See top 3 users on podium
- [ ] Your rank is highlighted
- [ ] All stats display correctly

### Test Streak:
- [ ] Complete a module today
- [ ] Check Dashboard → Streak should be 1
- [ ] Complete another module tomorrow
- [ ] Streak should be 2
- [ ] Skip a day, then complete a module
- [ ] Streak should reset to 1

### Test Calculators:
- [ ] Visit `/calculators`
- [ ] Try EMI Calculator
- [ ] Try SIP Calculator
- [ ] Try Emergency Fund Calculator
- [ ] Try Compound Interest Calculator
- [ ] All calculations work correctly

---

## 📱 Mobile Responsive

All new features are fully responsive:
- Leaderboard table scrolls horizontally on mobile
- Calculators stack vertically on small screens
- Streak display adapts to screen size
- Dashboard cards stack on mobile

---

## 🎯 How Streak Works (Technical)

1. **Module Completion** → Trigger fires
2. **Trigger calls** `update_user_streak(user_id)`
3. **Function checks**:
   - No previous activity? → Set streak to 1
   - Activity today? → Do nothing (already counted)
   - Activity yesterday? → Increment streak
   - Activity older? → Reset streak to 1
4. **Updates** `current_streak` and `longest_streak`
5. **Dashboard displays** updated streak

---

## 🏆 Leaderboard Ranking Logic

- Users ranked by **total_points** (descending)
- Top 3 get special podium display
- Current user highlighted in table
- Shows: Rank, Name, Points, Modules, Streak

---

## 💡 Pro Tips

1. **Build Streak**: Complete at least one module daily
2. **Climb Leaderboard**: Complete more modules to earn points
3. **Use Calculators**: Plan your finances before learning about them
4. **Check Profile**: See your detailed stats and achievements

---

## 🐛 Troubleshooting

### Streak not updating?
- Check if SQL queries ran successfully
- Verify columns exist in `user_progress` table
- Check browser console for errors

### Leaderboard empty?
- Complete at least one module
- Check if other users have completed modules
- Verify database connection

### Calculators not working?
- No database needed for calculators
- Check browser console for JavaScript errors
- Try refreshing the page

---

## 🎉 You're All Set!

Your FinLearn platform now has:
- ✅ Competitive leaderboard
- ✅ Habit-building streak system
- ✅ Practical financial calculators
- ✅ Enhanced dashboard
- ✅ Complete gamification

**Perfect for your hackathon demo!** 🚀

---

## 📊 Database Schema Summary

```
user_progress table:
├── id (UUID)
├── user_id (UUID)
├── total_points (INTEGER)
├── modules_completed (INTEGER)
├── current_streak (INTEGER) ← NEW
├── longest_streak (INTEGER) ← NEW
├── last_activity_date (DATE) ← NEW
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

**Need help?** Check browser console (F12) for error messages.
