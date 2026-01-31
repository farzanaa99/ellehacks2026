//shows up when quest starts
export type LoreEntry = {
  id: string;
  title: string;
  content: string;
  questId: "quest1" | "quest2" | "quest3" | "quest4";
};

export const LORE = {
  quest1: [
    {
      id: "l1_intro",
      title: "Welcome to Banking Basics!",
      content: "You're about to learn the fundamentals of banking. Understanding where to keep your money and how to use cards wisely is the first step to financial freedom. Let's battle through these challenges!",
      questId: "quest1" as const
    },
    {
      id: "l1_monster1",
      title: "The Savings Challenge",
      content: "Your first opponent is the Confusion Monster! It wants you to keep all your money in a chequing account where it doesn't grow. Remember: savings accounts and TFSAs help your money grow over time!",
      questId: "quest1" as const
    },
    {
      id: "l1_monster2",
      title: "Card Choice Battle",
      content: "Now you face Card Confusion! This monster tries to trick you into thinking credit and debit are the same. Remember: debit uses money you have, credit is borrowing money you'll pay back later!",
      questId: "quest1" as const
    },
    {
      id: "l1_final",
      title: "The Bank Decision",
      content: "This is it! The final boss of Quest 1 - choosing your bank. Good Bank offers free accounts with no fees and helps your money grow. Bad Bank charges monthly fees. Choose wisely - you'll need 500 credits to open a Good Bank account!",
      questId: "quest1" as const
    }
  ],
  quest2: [
    {
      id: "l2_intro",
      title: "Loans & Budgeting Quest",
      content: "Welcome to Quest 2! Now you'll learn about good debt vs bad debt, and how to budget your money wisely. These skills will protect you from financial traps!",
      questId: "quest2" as const
    },
    {
      id: "l2_monster1",
      title: "The Debt Demon",
      content: "Watch out for the Bad Debt Demon! It tries to trick you into taking high-interest loans like payday loans. Good debt (like student loans) has low interest and helps you build your future!",
      questId: "quest2" as const
    },
    {
      id: "l2_monster2",
      title: "Budget Battle",
      content: "The Budget Breaker wants you to spend everything! But smart budgeting follows the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and investments!",
      questId: "quest2" as const
    },
    {
      id: "l2_final",
      title: "Needs vs Wants",
      content: "Your final challenge: understanding the difference between needs and wants. Needs are essential (food, shelter, clothing). Wants are nice-to-have (games, snacks, fancy items). Master this to make smart spending choices!",
      questId: "quest2" as const
    }
  ],
  quest3: [
    {
      id: "l3_intro",
      title: "The Investing Quest",
      content: "Quest 3 is all about investing! Learn how your money can grow over time through investing. The earlier you start, the more your money can grow thanks to compound interest!",
      questId: "quest3" as const
    },
    {
      id: "l3_monster1",
      title: "Investment Ignorance",
      content: "The Investment Ignorance monster tries to make investing seem scary and complicated. But investing is simply putting your money somewhere where it can grow over time - like stocks, bonds, or savings accounts!",
      questId: "quest3" as const
    },
    {
      id: "l3_monster2",
      title: "Compound Interest Explained",
      content: "Compound Confusion is trying to trick you! Compound interest means your money earns money, and then THAT money also earns money. It's like a snowball rolling downhill - it gets bigger and bigger!",
      questId: "quest3" as const
    },
    {
      id: "l3_final",
      title: "Start Early!",
      content: "The Procrastination Beast wants you to wait! But the best time to start investing is NOW. Even small amounts invested early can grow into large amounts over time. Time is your greatest ally in investing!",
      questId: "quest3" as const
    }
  ],
  quest4: [
    {
      id: "l4_intro",
      title: "The Final Boss Challenge",
      content: "You've made it to the final quest! This is where everything comes together. The Financial Illiteracy Boss will test all your knowledge: banking, budgeting, debt, and investing. Show what you've learned!",
      questId: "quest4" as const
    },
    {
      id: "l4_final",
      title: "Victory Awaits!",
      content: "If you can defeat the final boss, you'll prove you understand smart financial habits: saving money, investing for the future, avoiding bad debt, and building a good credit score. You're ready to open your Good Bank account!",
      questId: "quest4" as const
    }
  ]
};


export function getLoreForQuest(questId: keyof typeof LORE): LoreEntry[] {
  return LORE[questId] || [];
}


export function getLoreEntry(loreId: string): LoreEntry | null {
  for (const questLore of Object.values(LORE)) {
    const entry = questLore.find(e => e.id === loreId);
    if (entry) return entry;
  }
  return null;
}
