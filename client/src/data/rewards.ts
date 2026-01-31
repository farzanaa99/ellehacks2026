import type { InventoryItem, QuestId } from "../game/types";

export const QUEST_REWARDS: Record<QuestId, InventoryItem[]> = {
  quest1: [
    {
      id: "weapon_good_bank",
      name: "Good Bank Card",
      type: "weapon",
      description: "A powerful card from Good Bank. No fees, no worries!"
    },
    {
      id: "weapon_bad_bank",
      name: "Bad Bank Card",
      type: "weapon",
      description: "A card from Bad Bank. It charges fees, but it's better than nothing."
    }
  ],
  quest2: [
    {
      id: "armor_budget",
      name: "Budget Shield",
      type: "armor",
      description: "Protects you from bad financial decisions. Follow the 50/30/20 rule!"
    },
    {
      id: "armor_spending_guard",
      name: "Spending Guard",
      type: "armor",
      description: "Prevents impulse purchases. Helps you stay on budget."
    }
  ],
  quest3: [
    {
      id: "ability_compound",
      name: "Compound Interest Power",
      type: "ability",
      description: "Your money makes money, which makes more money! Start investing early."
    },
    {
      id: "ability_smart_saver",
      name: "Smart Saver Badge",
      type: "ability",
      description: "Learn to save consistently and watch your wealth grow over time."
    }
  ],
  quest4: [
    {
      id: "ability_financial_master",
      name: "Financial Master Badge",
      type: "ability",
      description: "You've mastered financial literacy! You know how to save, invest, and build credit."
    },
    {
      id: "ability_credit_champion",
      name: "Credit Champion Emblem",
      type: "ability",
      description: "You understand credit, debt management, and long-term financial strategy."
    }
  ]
};

/**
 * Returns all rewards for a quest (optionally filtered by bank choice for quest1)
 */
export function getQuestRewards(
  questId: QuestId,
  bankChoice: "good" | "bad" | null = null
): InventoryItem[] {
  const rewards = QUEST_REWARDS[questId] || [];

  if (questId === "quest1" && bankChoice) {
    return rewards.filter(r => r.id.includes(bankChoice));
  }

  return rewards;
}
