# FinLearn - Financial Literacy Gamification Platform

🚀 **Live Demo**: [https://fin-learn.vercel.app/](https://fin-learn.vercel.app/)

A modern, gamified platform to teach personal finance, investing, and wealth management to young adults through interactive quizzes, challenges, and simulations.

![FinLearn](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green)

---

## 🎯 Features

### ✅ Currently Implemented:
- **Secure Authentication** - Email/password signup and login with Supabase
- **Password Recovery** - Forgot password flow with email verification
- **Protected Routes** - Dashboard accessible only to authenticated users
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Professional page transitions
- **Custom Email Templates** - Branded confirmation and reset emails
- **Production Ready** - Deployed on Vercel with HTTPS

### 🚧 Coming Soon:
- Interactive quiz system with scoring
- Learning modules on budgeting, investing, and saving
- Gamification (points, badges, leaderboards)
- Investment simulator with virtual portfolio
- Progress tracking and analytics
- Indian financial products education (FD, Mutual Funds, SIP, etc.)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js 18
- Tailwind CSS
- React Router v6
- React Icons
- React Transition Group

**Backend:**
- Node.js
- Express.js
- Supabase (Authentication & Database)

**Deployment:**
- Vercel (Frontend)
- Supabase (Backend Services)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tankuday21/FinTech---LetsSaveForFuture.git
cd FinTech---LetsSaveForFuture
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Set up environment variables**

Create `client/.env`:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create `server/.env`:
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

4. **Configure Supabase**
   - Enable Email authentication
   - Set Site URL to `http://localhost:3000`
   - Add redirect URLs
   - See `SUPABASE_SETUP.md` for detailed instructions

5. **Run the development server**
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📁 Project Structure

```
financial-literacy-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── ForgotPassword.js
│   │   │   └── Dashboard.js
│   │   ├── services/      # API & Supabase services
│   │   ├── context/       # React context (Auth)
│   │   ├── utils/         # Helper functions
│   │   └── styles/        # Global styles
│   └── public/
├── server/                # Node.js backend
│   ├── routes/
│   ├── middleware/
│   └── config/
├── SUPABASE_SETUP.md      # Supabase configuration guide
├── VERCEL_DEPLOYMENT.md   # Deployment instructions
├── EMAIL_TEMPLATES.md     # Custom email templates
├── PRODUCTION_SETUP.md    # Production checklist
└── README.md
```

---

## 🎨 Design System

**Colors:**
- Primary: Blue (#0ea5e9)
- Accent: Purple (#d946ef)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)

**Typography:**
- Display Font: Poppins
- Body Font: Inter

**Components:**
- Custom buttons with hover effects
- Smooth page transitions
- Professional form inputs
- Responsive navigation

---

## 📚 Documentation

- [Supabase Setup Guide](SUPABASE_SETUP.md)
- [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)
- [Email Templates](EMAIL_TEMPLATES.md)
- [Production Setup](PRODUCTION_SETUP.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

---

## 🎯 Target Audience

- Young adults (18-35 years)
- Primary focus: India
- Beginners in personal finance
- Students and early-career professionals

---

## 📈 Learning Topics

1. **Budgeting** - 50/30/20 rule, expense tracking
2. **Saving** - Emergency funds, FD, RD
3. **Investing** - Stocks, Mutual Funds, SIP, ETFs
4. **Debt Management** - Credit cards, loans, EMI
5. **Risk Management** - Insurance, diversification
6. **Indian Financial Products** - PPF, NPS, tax-saving

---

## 🤝 Contributing

This is a hackathon project. Contributions, issues, and feature requests are welcome!

---

## 📝 License

MIT License - feel free to use this project for learning and development.

---

## 👨‍💻 Author

**Uday Tank**
- GitHub: [@tankuday21](https://github.com/tankuday21)
- Project: [FinTech - LetsSaveForFuture](https://github.com/tankuday21/FinTech---LetsSaveForFuture)

---

## 🙏 Acknowledgments

- Built for college hackathon
- Inspired by the need for financial literacy in India
- Thanks to Supabase and Vercel for amazing free tiers

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Open an issue on GitHub
3. Review Supabase and Vercel documentation

---

## 🎉 Status

✅ **Live and Production Ready!**

Visit: [https://fin-learn.vercel.app/](https://fin-learn.vercel.app/)

---

**Built with ❤️ for financial literacy**
