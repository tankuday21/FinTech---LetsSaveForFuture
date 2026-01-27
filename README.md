# FinLearn - Financial Literacy Gamification Platform

A modern, gamified platform to teach personal finance, investing, and wealth management to young adults through interactive quizzes, challenges, and simulations.

## Features

- 🔐 Secure authentication with Supabase
- 📚 Interactive learning modules
- 🎮 Gamified challenges and quizzes
- 📈 Investment simulations
- 🏆 Progress tracking and achievements
- 💰 Topics: Budgeting, Saving, Debt Management, Stocks, Mutual Funds, ETFs, Risk Management

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- Supabase Client

**Backend:**
- Node.js
- Express.js
- Supabase

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm run install-all
```

3. Set up Supabase:
   - Create a new project at https://supabase.com
   - Copy your project URL and anon key
   - Create `.env` files from examples:
     - `client/.env` (copy from `client/.env.example`)
     - `server/.env` (copy from `server/.env.example`)
   - Add your Supabase credentials

4. Run the development servers:
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
financial-literacy-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API & Supabase services
│   │   ├── context/       # React context
│   │   └── styles/        # Global styles
│   └── public/
├── server/                # Node.js backend
│   ├── routes/
│   ├── middleware/
│   └── config/
└── README.md
```

## Available Scripts

- `npm run dev` - Run both frontend and backend
- `npm run client` - Run frontend only
- `npm run server` - Run backend only
- `npm run install-all` - Install all dependencies

## License

MIT
