import type { PlayerState, QuestId, CreditScore, Question } from "./types";
import { 
    STARTING_CREDITS, 
    STARTING_HP,
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
        hp: STARTING_HP,
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

        // Validate and sanitize parsed.player
        const rawPlayer = parsed.player || {};
        const player = createInitialPlayerState();

        player.playerId = rawPlayer.playerId || player.playerId;
        player.hp = typeof rawPlayer.hp === 'number' ? rawPlayer.hp : player.hp;
        player.credits = typeof rawPlayer.credits === 'number' ? rawPlayer.credits : player.credits;
        player.clarity = typeof rawPlayer.clarity === 'number' ? rawPlayer.clarity : player.clarity;
        player.creditScore = calculateCreditScore(player.credits);
        player.inventory = Array.isArray(rawPlayer.inventory) ? rawPlayer.inventory : player.inventory;
        player.bankChoice = rawPlayer.bankChoice ?? player.bankChoice;
        player.completedQuests = Array.isArray(rawPlayer.completedQuests) ? rawPlayer.completedQuests : [];
        player.unlockedQuests = Array.isArray(rawPlayer.unlockedQuests) ? rawPlayer.unlockedQuests : ['quest1'];

        // Ensure quest1 is always available
        if (!player.unlockedQuests.includes('quest1')) {
            player.unlockedQuests.unshift('quest1');
        }

        // Validate top-level properties
        const currentQuest = (parsed.currentQuest as any) || INITIAL_GAME_STATE.currentQuest;
        const currentFight = typeof parsed.currentFight === 'number' ? parsed.currentFight : INITIAL_GAME_STATE.currentFight;
        const wrongAnswers = typeof parsed.wrongAnswers === 'number' ? parsed.wrongAnswers : INITIAL_GAME_STATE.wrongAnswers;

        return {
            ...INITIAL_GAME_STATE,
            ...parsed,
            player,
            currentQuest,
            currentFight,
            wrongAnswers,
            notifications: []
        } as GameState;
    } catch (error) {
        console.error('Error loading game state:', error);
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