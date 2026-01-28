// Random events that can occur during simulation
export const simulationEvents = {
  good: [
    {
      id: 'bonus',
      title: 'Bonus Received! 🎉',
      description: 'Your hard work paid off! Your company gave you a performance bonus.',
      amount: 10000,
      emoji: '🎉',
      color: 'green'
    },
    {
      id: 'increment',
      title: 'Salary Increment! 📈',
      description: 'Congratulations! You got a 10% salary raise.',
      amount: 5000,
      emoji: '📈',
      color: 'green'
    },
    {
      id: 'tax_refund',
      title: 'Tax Refund! 💰',
      description: 'You got a tax refund from last year.',
      amount: 5000,
      emoji: '💰',
      color: 'green'
    },
    {
      id: 'freelance',
      title: 'Freelance Income! 💼',
      description: 'You completed a freelance project successfully.',
      amount: 8000,
      emoji: '💼',
      color: 'green'
    },
    {
      id: 'gift',
      title: 'Gift Money! 🎁',
      description: 'You received money as a gift from family.',
      amount: 3000,
      emoji: '🎁',
      color: 'green'
    }
  ],
  bad: [
    {
      id: 'car_breakdown',
      title: 'Car Breakdown! 🚗',
      description: 'Your car needs urgent repairs.',
      amount: 15000,
      emoji: '🚗',
      color: 'red'
    },
    {
      id: 'medical',
      title: 'Medical Emergency! 🏥',
      description: 'Unexpected medical expenses for family member.',
      amount: 20000,
      emoji: '🏥',
      color: 'red'
    },
    {
      id: 'phone_broken',
      title: 'Phone Broken! 📱',
      description: 'Your phone screen cracked and needs replacement.',
      amount: 12000,
      emoji: '📱',
      color: 'red'
    },
    {
      id: 'home_repair',
      title: 'Home Repair! 🏠',
      description: 'Water leakage needs immediate fixing.',
      amount: 18000,
      emoji: '🏠',
      color: 'red'
    },
    {
      id: 'laptop_issue',
      title: 'Laptop Issue! 💻',
      description: 'Your laptop crashed and needs repair.',
      amount: 10000,
      emoji: '💻',
      color: 'red'
    },
    {
      id: 'bike_accident',
      title: 'Bike Accident! 🏍️',
      description: 'Minor accident, bike needs repairs.',
      amount: 8000,
      emoji: '🏍️',
      color: 'red'
    }
  ],
  temptations: [
    {
      id: 'gaming_console',
      title: 'New Gaming Console! 🎮',
      description: 'The latest PlayStation is on sale. Should you buy it?',
      amount: 45000,
      emoji: '🎮',
      color: 'yellow',
      choices: [
        { text: 'Buy it! 🛒', impact: 'spend', message: 'Enjoy gaming, but your savings took a hit!' },
        { text: 'Skip it 🚫', impact: 'save', message: 'Smart choice! Your future self thanks you.' }
      ]
    },
    {
      id: 'vacation',
      title: 'Dream Vacation! ✈️',
      description: 'Your friends are planning a trip to Goa. Join them?',
      amount: 30000,
      emoji: '✈️',
      color: 'yellow',
      choices: [
        { text: 'Go for it! 🏖️', impact: 'spend', message: 'Great memories, but expensive!' },
        { text: 'Maybe later 🏠', impact: 'save', message: 'You can travel when you\'re more prepared.' }
      ]
    },
    {
      id: 'phone_upgrade',
      title: 'Latest iPhone! 📱',
      description: 'New iPhone just launched. Your current phone works fine though.',
      amount: 120000,
      emoji: '📱',
      color: 'yellow',
      choices: [
        { text: 'Buy it! 🤩', impact: 'spend', message: 'Shiny new phone, but huge expense!' },
        { text: 'Keep current 📵', impact: 'save', message: 'Wise decision! Your phone still works great.' }
      ]
    },
    {
      id: 'designer_shoes',
      title: 'Designer Shoes! 👟',
      description: 'Those sneakers you\'ve been eyeing are finally in stock.',
      amount: 15000,
      emoji: '👟',
      color: 'yellow',
      choices: [
        { text: 'Buy them! 👠', impact: 'spend', message: 'Stylish, but was it necessary?' },
        { text: 'Skip them 🚶', impact: 'save', message: 'Your current shoes work just fine!' }
      ]
    },
    {
      id: 'dining_out',
      title: 'Fancy Restaurant! 🍽️',
      description: 'Friends want to celebrate at an expensive restaurant.',
      amount: 5000,
      emoji: '🍽️',
      color: 'yellow',
      choices: [
        { text: 'Join them! 🎉', impact: 'spend', message: 'Good times, but adds up quickly!' },
        { text: 'Cook at home 🏠', impact: 'save', message: 'Homemade food is healthier and cheaper!' }
      ]
    }
  ]
};

// Monthly expenses template
export const monthlyExpenses = {
  rent: { name: 'Rent', amount: 15000, emoji: '🏠', required: true },
  groceries: { name: 'Groceries', amount: 8000, emoji: '🛒', required: true },
  utilities: { name: 'Utilities', amount: 3000, emoji: '💡', required: true },
  transport: { name: 'Transport', amount: 4000, emoji: '🚗', required: true },
  phone: { name: 'Phone Bill', amount: 500, emoji: '📱', required: true },
  internet: { name: 'Internet', amount: 1000, emoji: '🌐', required: true },
  entertainment: { name: 'Entertainment', amount: 3000, emoji: '🎬', required: false },
  dining: { name: 'Dining Out', amount: 4000, emoji: '🍕', required: false },
  shopping: { name: 'Shopping', amount: 5000, emoji: '🛍️', required: false }
};

// Calculate total required expenses
export const getTotalRequiredExpenses = () => {
  return Object.values(monthlyExpenses)
    .filter(expense => expense.required)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

// Calculate total optional expenses
export const getTotalOptionalExpenses = () => {
  return Object.values(monthlyExpenses)
    .filter(expense => !expense.required)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

// Get random event
export const getRandomEvent = (month) => {
  // 40% chance of good event
  // 30% chance of bad event
  // 20% chance of temptation
  // 10% chance of no event
  
  const random = Math.random();
  
  if (random < 0.1) {
    return null; // No event
  } else if (random < 0.5) {
    // Good event
    const events = simulationEvents.good;
    return { ...events[Math.floor(Math.random() * events.length)], type: 'good' };
  } else if (random < 0.8) {
    // Bad event
    const events = simulationEvents.bad;
    return { ...events[Math.floor(Math.random() * events.length)], type: 'bad' };
  } else {
    // Temptation
    const events = simulationEvents.temptations;
    return { ...events[Math.floor(Math.random() * events.length)], type: 'temptation' };
  }
};
