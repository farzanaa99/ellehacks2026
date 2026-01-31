export type Enemy = {
  id: string;
  name: string;
  description: string;
  questId: "quest1" | "quest2" | "quest3" | "quest4";
  fightIndex: number; 
};

export const ENEMIES = {
  quest1: [
    {
      id: "e1_1",
      name: "Confusion Monster",
      description: "A tricky monster that makes you confused about where to save your money!",
      questId: "quest1" as const,
      fightIndex: 0
    },
    {
      id: "e1_2",
      name: "Card Confusion",
      description: "This monster tries to trick you into using the wrong card!",
      questId: "quest1" as const,
      fightIndex: 1
    },
    {
      id: "e1_3",
      name: "Bank Choice Boss",
      description: "The final decision - choose wisely between Good Bank and Bad Bank!",
      questId: "quest1" as const,
      fightIndex: 2
    }
  ],
  quest2: [
    {
      id: "e2_1",
      name: "Bad Debt Demon",
      description: "A dangerous creature that tries to trap you with high-interest loans!",
      questId: "quest2" as const,
      fightIndex: 0
    },
    {
      id: "e2_2",
      name: "Budget Breaker",
      description: "This monster wants you to spend everything without a plan!",
      questId: "quest2" as const,
      fightIndex: 1
    },
    {
      id: "e2_3",
      name: "Wants vs Needs",
      description: "A tricky opponent that blurs the line between what you need and what you want!",
      questId: "quest2" as const,
      fightIndex: 2
    }
  ],
  quest3: [
    {
      id: "e3_1",
      name: "Investment Ignorance",
      description: "A monster that tries to make you think investing is too complicated!",
      questId: "quest3" as const,
      fightIndex: 0
    },
    {
      id: "e3_2",
      name: "Compound Confusion",
      description: "This creature makes compound interest seem like magic instead of math!",
      questId: "quest3" as const,
      fightIndex: 1
    },
    {
      id: "e3_3",
      name: "Procrastination Beast",
      description: "A powerful enemy that tells you to wait until later to start investing!",
      questId: "quest3" as const,
      fightIndex: 2
    }
  ],
  quest4: [
    {
      id: "e4_1",
      name: "Financial Illiteracy Boss",
      description: "The ultimate challenge! This final boss tests everything you've learned about money!",
      questId: "quest4" as const,
      fightIndex: 0
    }
  ]
};


export function getEnemy(questId: keyof typeof ENEMIES, fightIndex: number): Enemy | null {
  const enemies = ENEMIES[questId];
  if (!enemies) return null;
  
  return enemies.find(e => e.fightIndex === fightIndex) || null;
}
