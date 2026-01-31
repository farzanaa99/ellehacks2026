import type { QuestId } from "./types";
export const STARTING_CREDITS = 0;
export const CREDITS_Q1 = 20; //quest 1 should give 20 credits by default
export const CREDITS_Q2 = 25; //quest 2 gives 25 credits by default
export const CREDITS_Q3 = 25; //quest 3 gives 25 credits by default


export const CREDITS_PER_CORRECT = 10; 
export const CREDITS_PER_WRONG = -2; 
export const CREDITS_FOR_GOOD_BANK = 500;
export const BAD_BANK_MONTHLY_FEE = 10;

export const MAX_WRONG_ANSWERS_PER_QUEST = 3;

export const CREDIT_SCORE_THRESHOLDS = {
    Poor: 0,
    Fair: 200,
    Good: 400,
    Excellent: 500
} as const;

export const QUEST_ORDER: QuestId[] = ["quest1", "quest2", "quest3", "quest4"];
export const QUESTIONS_PER_QUEST: Record<QuestId, number> = {
    quest1: 3,
    quest2: 3,
    quest3: 3,
    quest4: 1
};

export const STORAGE_KEY_PREFIX = "financialQuest_";
export const STORAGE_KEY_GAME_STATE = `${STORAGE_KEY_PREFIX}gameState`;
export const STORAGE_KEY_PLAYER_ID = `${STORAGE_KEY_PREFIX}playerId`;