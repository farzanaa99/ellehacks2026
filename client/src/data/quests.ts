//data used for map page to access quests, player current quest pulled from here
import type { QuestId } from "../game/types";

export type Quest = {
  id: QuestId;
  name: string;
  description: string;
  numberOfQuestions: number;
  rewardType: "weapon" | "armor" | "ability";
  unlockedByDefault: boolean;
};

export const QUESTS: Record<QuestId, Quest> = {
  quest1: {
    id: "quest1",
    name: "Banking Basics",
    description: "Learn about chequing vs savings accounts, credit vs debit cards, and choosing the right bank. Master the fundamentals of banking!",
    numberOfQuestions: 3,
    rewardType: "weapon",
    unlockedByDefault: true
  },
  quest2: {
    id: "quest2",
    name: "Loans & Budgeting",
    description: "Understand good debt vs bad debt, learn the 50/30/20 budgeting rule, and distinguish between needs and wants. Build your financial defense!",
    numberOfQuestions: 3,
    rewardType: "armor",
    unlockedByDefault: false
  },
  quest3: {
    id: "quest3",
    name: "Investing",
    description: "Discover how investing works, understand compound interest, and learn why starting early matters. Grow your financial power!",
    numberOfQuestions: 3,
    rewardType: "ability",
    unlockedByDefault: false
  },
  quest4: {
    id: "quest4",
    name: "Final Boss",
    description: "The ultimate challenge! Apply everything you've learned about banking, budgeting, debt, and investing. Defeat the Financial Illiteracy Boss!",
    numberOfQuestions: 1,
    rewardType: "ability",
    unlockedByDefault: false
  }
};

export function getQuest(questId: QuestId): Quest | null {
  return QUESTS[questId] || null;
}


export function getAllQuests(): Quest[] {
  return Object.values(QUESTS);
}


export function getQuestsInOrder(): Quest[] {
  const order: QuestId[] = ["quest1", "quest2", "quest3", "quest4"];
  return order.map(id => QUESTS[id]);
}
