//all enemy descriptions
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
    }
  ],
  quest2: [
    {
      id: "e2_1",
      name: "Bad Debt Demon",
      description: "A dangerous creature that tries to trap you with high-interest loans!",
      questId: "quest2" as const,
      fightIndex: 0
    }
  ],
  quest3: [
    {
      id: "e3_1",
      name: "Investment Ignorance",
      description: "A monster that tries to make you think investing is too complicated!",
      questId: "quest3" as const,
      fightIndex: 0
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
