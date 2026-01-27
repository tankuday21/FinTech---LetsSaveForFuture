import { 
  HiLightBulb, 
  HiCurrencyDollar, 
  HiCalculator, 
  HiShieldCheck,
  HiBuildingLibrary,
  HiCreditCard,
  HiBanknotes,
  HiClock,
  HiChartBar,
  HiCreditCard as HiCard,
  HiHome,
  HiCheckBadge,
  HiRocketLaunch,
  HiScale,
  HiPresentationChartLine,
  HiArrowTrendingUp,
  HiChartPie,
  HiPaintBrush,
  HiReceiptPercent,
  HiBeaker,
  HiShieldExclamation,
  HiExclamationTriangle,
  HiDocumentText,
  HiTrophy
} from 'react-icons/hi2';

export const getModuleIcon = (iconName) => {
  const icons = {
    'lightbulb': HiLightBulb,
    'currency': HiCurrencyDollar,
    'calculator': HiCalculator,
    'shield': HiShieldCheck,
    'bank': HiBuildingLibrary,
    'gem': HiCreditCard,
    'muscle': HiBanknotes,
    'clock': HiClock,
    'chart': HiChartBar,
    'card': HiCard,
    'home': HiHome,
    'target': HiCheckBadge,
    'rocket': HiRocketLaunch,
    'scale': HiScale,
    'presentation': HiPresentationChartLine,
    'trending': HiArrowTrendingUp,
    'pie': HiChartPie,
    'paint': HiPaintBrush,
    'receipt': HiReceiptPercent,
    'beaker': HiBeaker,
    'shield-exclamation': HiShieldExclamation,
    'warning': HiExclamationTriangle,
    'document': HiDocumentText,
    'trophy': HiTrophy
  };
  return icons[iconName] || HiLightBulb;
};

export const learningModules = [
  {
    level: 1,
    title: "Foundation",
    subtitle: "Beginner",
    description: "Build financial awareness and basic money management skills",
    color: "green",
    duration: "2-3 hours",
    modules: [
      {
        id: 1,
        title: "Money Mindset & Financial Goals",
        description: "Why financial literacy matters and setting SMART goals",
        duration: "20 min",
        points: 100,
        icon: "lightbulb",
        topics: ["Money myths", "SMART goals", "Financial vision"],
        locked: false
      },
      {
        id: 2,
        title: "Understanding Income & Expenses",
        description: "Learn to read payslips and categorize expenses",
        duration: "25 min",
        points: 100,
        icon: "currency",
        topics: ["Payslip breakdown", "Fixed vs variable", "Needs vs wants"],
        locked: false
      },
      {
        id: 3,
        title: "Creating Your First Budget",
        description: "Master the 50/30/20 rule and budgeting methods",
        duration: "30 min",
        points: 150,
        icon: "calculator",
        topics: ["50/30/20 rule", "Zero-based budgeting", "Budget tools"],
        locked: true
      },
      {
        id: 4,
        title: "Emergency Fund Basics",
        description: "Build your financial safety net step by step",
        duration: "20 min",
        points: 100,
        icon: "shield",
        topics: ["Why emergency fund", "How much to save", "Where to keep"],
        locked: true
      }
    ]
  },
  {
    level: 2,
    title: "Smart Saving",
    subtitle: "Beginner-Intermediate",
    description: "Master saving strategies and Indian savings products",
    color: "blue",
    duration: "2-3 hours",
    modules: [
      {
        id: 5,
        title: "Savings Account Strategies",
        description: "Choose the right savings account and maximize benefits",
        duration: "25 min",
        points: 150,
        icon: "bank",
        topics: ["Account types", "Interest rates", "Digital vs traditional"],
        locked: true
      },
      {
        id: 6,
        title: "Fixed Deposits (FD) & Recurring Deposits (RD)",
        description: "Understand FDs, RDs, and tax implications",
        duration: "30 min",
        points: 150,
        icon: "gem",
        topics: ["FD vs RD", "Interest calculation", "Tax implications"],
        locked: true
      },
      {
        id: 7,
        title: "Building Your Emergency Fund",
        description: "Practical steps to build 3-6 months expenses",
        duration: "25 min",
        points: 150,
        icon: "muscle",
        topics: ["Calculate target", "Auto-save", "When to use"],
        locked: true
      },
      {
        id: 8,
        title: "Short-term vs Long-term Savings",
        description: "Align savings with your financial goals",
        duration: "20 min",
        points: 100,
        icon: "clock",
        topics: ["Goal-based saving", "Liquidity", "Returns"],
        locked: true
      }
    ]
  },
  {
    level: 3,
    title: "Debt Management",
    subtitle: "Intermediate",
    description: "Understand and manage debt responsibly",
    color: "yellow",
    duration: "2-3 hours",
    modules: [
      {
        id: 9,
        title: "Understanding Credit & Credit Scores",
        description: "Master CIBIL scores and credit reports",
        duration: "30 min",
        points: 200,
        icon: "chart",
        topics: ["CIBIL score", "Credit factors", "Improve score"],
        locked: true
      },
      {
        id: 10,
        title: "Credit Cards - Smart Usage",
        description: "Use credit cards wisely and avoid debt traps",
        duration: "35 min",
        points: 200,
        icon: "card",
        topics: ["How cards work", "Rewards", "Avoid traps"],
        locked: true
      },
      {
        id: 11,
        title: "Loans & EMI Calculation",
        description: "Understand different loans and calculate EMIs",
        duration: "30 min",
        points: 200,
        icon: "home",
        topics: ["Loan types", "EMI calculation", "Interest rates"],
        locked: true
      },
      {
        id: 12,
        title: "Debt Payoff Strategies",
        description: "Learn snowball and avalanche methods",
        duration: "25 min",
        points: 200,
        icon: "target",
        topics: ["Snowball method", "Avalanche method", "Debt-free plan"],
        locked: true
      }
    ]
  },
  {
    level: 4,
    title: "Investment Fundamentals",
    subtitle: "Intermediate",
    description: "Start your investing journey with confidence",
    color: "purple",
    duration: "3-4 hours",
    modules: [
      {
        id: 13,
        title: "Introduction to Investing",
        description: "Why investing matters and power of compounding",
        duration: "30 min",
        points: 250,
        icon: "rocket",
        topics: ["Saving vs investing", "Compounding", "Start small"],
        locked: true
      },
      {
        id: 14,
        title: "Risk & Return Basics",
        description: "Assess your risk tolerance and balance portfolio",
        duration: "25 min",
        points: 200,
        icon: "scale",
        topics: ["Risk-return tradeoff", "Risk types", "Asset allocation"],
        locked: true
      },
      {
        id: 15,
        title: "Stocks & Share Market",
        description: "Understand stock market and start trading",
        duration: "45 min",
        points: 300,
        icon: "presentation",
        topics: ["NSE/BSE", "Demat account", "Stock orders"],
        locked: true
      },
      {
        id: 16,
        title: "Mutual Funds & SIP",
        description: "Master mutual funds and systematic investing",
        duration: "40 min",
        points: 300,
        icon: "trending",
        topics: ["Fund types", "SIP", "NAV", "Tax implications"],
        locked: true
      }
    ]
  },
  {
    level: 5,
    title: "Advanced Investing",
    subtitle: "Advanced",
    description: "Build a diversified investment portfolio",
    color: "red",
    duration: "3-4 hours",
    modules: [
      {
        id: 17,
        title: "ETFs & Index Funds",
        description: "Learn passive investing strategies",
        duration: "35 min",
        points: 300,
        icon: "pie",
        topics: ["ETFs", "Index funds", "Passive investing"],
        locked: true
      },
      {
        id: 18,
        title: "Portfolio Diversification",
        description: "Don't put all eggs in one basket",
        duration: "30 min",
        points: 300,
        icon: "paint",
        topics: ["Asset classes", "Rebalancing", "Risk management"],
        locked: true
      },
      {
        id: 19,
        title: "Tax-Saving Investments (80C)",
        description: "Maximize tax savings with smart investments",
        duration: "40 min",
        points: 350,
        icon: "receipt",
        topics: ["Section 80C", "ELSS", "PPF", "NPS"],
        locked: true
      },
      {
        id: 20,
        title: "PPF, NPS & Retirement Planning",
        description: "Plan for a secure retirement",
        duration: "35 min",
        points: 300,
        icon: "beaker",
        topics: ["PPF benefits", "NPS tiers", "Retirement corpus"],
        locked: true
      }
    ]
  },
  {
    level: 6,
    title: "Wealth Protection",
    subtitle: "Advanced",
    description: "Protect and grow wealth long-term",
    color: "gray",
    duration: "2-3 hours",
    modules: [
      {
        id: 21,
        title: "Insurance Essentials",
        description: "Choose the right insurance coverage",
        duration: "35 min",
        points: 300,
        icon: "shield-exclamation",
        topics: ["Term insurance", "Health insurance", "Coverage calculation"],
        locked: true
      },
      {
        id: 22,
        title: "Risk Management",
        description: "Protect your wealth from uncertainties",
        duration: "30 min",
        points: 300,
        icon: "warning",
        topics: ["Risk types", "Hedging", "Insurance vs investment"],
        locked: true
      },
      {
        id: 23,
        title: "Estate Planning Basics",
        description: "Plan for wealth transfer and succession",
        duration: "25 min",
        points: 250,
        icon: "document",
        topics: ["Will", "Nomination", "Succession planning"],
        locked: true
      },
      {
        id: 24,
        title: "Building Long-term Wealth",
        description: "Strategies for sustainable wealth creation",
        duration: "30 min",
        points: 300,
        icon: "trophy",
        topics: ["Wealth mindset", "Multiple income", "Legacy building"],
        locked: true
      }
    ]
  }
];

export const getLevelColor = (color) => {
  const colors = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
      icon: 'bg-green-100 text-green-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
      icon: 'bg-blue-100 text-blue-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700',
      icon: 'bg-yellow-100 text-yellow-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      badge: 'bg-purple-100 text-purple-700',
      icon: 'bg-purple-100 text-purple-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700',
      icon: 'bg-red-100 text-red-600'
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-700',
      badge: 'bg-gray-100 text-gray-700',
      icon: 'bg-gray-100 text-gray-600'
    }
  };
  return colors[color] || colors.blue;
};
