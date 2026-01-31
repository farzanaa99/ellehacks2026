import type { PlayerState, QuestId, CreditScore, Question } from "./types";
import { 
    STARTING_CREDITS, 
    STARTING_CLARITY,
    STORAGE_KEY_GAME_STATE,
    STORAGE_KEY_PLAYER_ID,
    CREDIT_SCORE_THRESHOLDS
} from "./constants";

export type GameState = {
    currentQuest: QuestId;
    currentFight: number; 
    player: PlayerState;
    wrongAnswers: number; 
    notifications: Array<{ type: "success" | "warning" | "info"; message: string; timestamp: number }>;
    selectedFinalQuestion?: Question; // Store the randomly selected question for quest4
}


export function calculateCreditScore(credits: number): CreditScore {
    if (credits >= CREDIT_SCORE_THRESHOLDS.Excellent) return "Excellent";
    if (credits >= CREDIT_SCORE_THRESHOLDS.Good) return "Good";
    if (credits >= CREDIT_SCORE_THRESHOLDS.Fair) return "Fair";
    return "Poor";
}


function generatePlayerId(): string {
    return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}


function getPlayerId(): string {
    const stored = localStorage.getItem(STORAGE_KEY_PLAYER_ID);
    if (stored) return stored;
    
    const newId = generatePlayerId();
    localStorage.setItem(STORAGE_KEY_PLAYER_ID, newId);
    return newId;
}


function createInitialPlayerState(): PlayerState {
    const playerId = getPlayerId();
    return {
        credits: STARTING_CREDITS,
        clarity: STARTING_CLARITY,
        creditScore: calculateCreditScore(STARTING_CREDITS),
        inventory: [],
        bankChoice: null,
        completedQuests: [],
        unlockedQuests: ["quest1"], 
        playerId
    };
}

export const INITIAL_GAME_STATE: GameState = {
    currentQuest: "quest1",
    currentFight: 0,
    wrongAnswers: 0,
    player: createInitialPlayerState(),
    notifications: []
};


export function loadGameState(): GameState {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_GAME_STATE);
        if (!stored) return INITIAL_GAME_STATE;
        
        const parsed = JSON.parse(stored);
        
        if (!parsed.player?.playerId) {
            parsed.player.playerId = getPlayerId();
        }
        
        if (parsed.player) {
            parsed.player.creditScore = calculateCreditScore(parsed.player.credits);
        }
        
        if (!parsed.player?.unlockedQuests?.includes("quest1")) {
            parsed.player.unlockedQuests = ["quest1", ...(parsed.player.unlockedQuests || [])];
        }
        
        return {
            ...INITIAL_GAME_STATE,
            ...parsed,
            notifications: [] 
        };
    } catch (error) {
        console.error("Error loading game state:", error);
        return INITIAL_GAME_STATE;
    }
}


export function saveGameState(state: GameState): void {
    try {
        const stateToSave = {
            ...state,
            notifications: []
        };
        localStorage.setItem(STORAGE_KEY_GAME_STATE, JSON.stringify(stateToSave));
    } catch (error) {
        console.error("Error saving game state:", error);
    }
}


export function resetGameState(): GameState {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY_GAME_STATE);
    localStorage.removeItem(STORAGE_KEY_PLAYER_ID);
    
    return INITIAL_GAME_STATE;
}