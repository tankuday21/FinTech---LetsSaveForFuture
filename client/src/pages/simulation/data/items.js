export const items = [
    {
        id: 'gym_membership',
        name: 'Gold Gym Subs',
        emoji: '💪',
        price: 15000, // Yearly
        description: 'Boosts health & happiness.',
        effects: {
            happiness: 10,
            health: 10
        }
    },
    {
        id: 'gaming_console',
        name: 'PS5 Pro',
        emoji: '🎮',
        price: 50000,
        description: 'Huge happiness boost. Distracts from work.',
        effects: {
            happiness: 25,
            careerXP: -5
        }
    },
    {
        id: 'online_course',
        name: 'Finance Bootcamp',
        emoji: '🎓',
        price: 5000,
        description: 'Increases Career XP and Financial Knowledge.',
        effects: {
            careerXP: 15,
            happiness: -5 // Studying is boring
        }
    },
    {
        id: 'coffee_machine',
        name: 'Espresso Maker',
        emoji: '☕',
        price: 8000,
        description: 'Daily energy boost.',
        effects: {
            happiness: 5,
            careerXP: 5
        }
    },
    {
        id: 'stock_portfolio',
        name: 'Blue Chip Stocks',
        emoji: '📈',
        price: 25000,
        description: 'Passive income generator.',
        effects: {
            financialHealth: 10
        }
    }
];
