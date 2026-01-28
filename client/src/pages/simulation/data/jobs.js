export const sideHustles = [
    {
        id: 'uber',
        title: 'Drive Ubar 🚗',
        description: 'Drive people around the city.',
        energyCost: 30,
        happinessCost: 5,
        cashReward: 2000,
        risk: 0.1 // 10% chance of breakdown
    },
    {
        id: 'delivery',
        title: 'Zwiggy Delivery 🍕',
        description: 'Deliver food during rush hour.',
        energyCost: 40,
        happinessCost: 10,
        cashReward: 3000,
        risk: 0.05
    },
    {
        id: 'freelance',
        title: 'Freelance Gig 💻',
        description: 'Take a project on Upwerk.',
        energyCost: 50,
        happinessCost: 15, // Stressful
        cashReward: 8000,
        risk: 0.3 // 30% chance of bad client (no pay)
    }
];

export const educationOptions = [
    {
        id: 'course',
        title: 'Online Certification 📜',
        description: 'Learn a new skill on Coursera.',
        energyCost: 30,
        cashCost: 5000,
        xpReward: 15
    },
    {
        id: 'bootcamp',
        title: 'Weekend Bootcamp 👨‍💻',
        description: 'Intensive coding workshop.',
        energyCost: 60,
        cashCost: 15000,
        xpReward: 40
    },
    {
        id: 'network',
        title: 'Networking Event 🤝',
        description: 'Schmooze with industry leaders.',
        energyCost: 20,
        cashCost: 2000,
        xpReward: 10,
        happinessReward: 5
    }
];
