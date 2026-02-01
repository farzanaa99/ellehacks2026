import type { QuestId, Question, InventoryItem, BankChoice } from "./types";
import type { GameState } from "./state";
import { 
    CREDITS_PER_CORRECT, 
    CREDITS_PER_WRONG,
    MAX_WRONG_ANSWERS_PER_QUEST,
    CREDITS_FOR_GOOD_BANK,
    BAD_BANK_MONTHLY_FEE,
    QUESTIONS_PER_QUEST,
    QUEST_ORDER
} from "./constants";
import { calculateCreditScore, saveGameState } from "./state";
import { QUESTIONS } from "../data/questions";
import { getRandomElement } from "../utils/random";


export function answerQuestion(
    state: GameState,
    selectedAnswer: number
): { newState: GameState; isCorrect: boolean; shouldResetQuest: boolean } {
    const currentQuest = state.currentQuest;
    
    const question = getCurrentQuestion(state);
    if (!question) {
        return { newState: state, isCorrect: false, shouldResetQuest: false };
    }
    
    let newState = { ...state };
    if (currentQuest === "quest4" && !newState.selectedFinalQuestion) {
        newState.selectedFinalQuestion = question;
    }
    
    const isCorrect = selectedAnswer === question.answer;
    let shouldResetQuest = false;
    
    if (isCorrect) {
        newState.player.credits += CREDITS_PER_CORRECT;
        newState.player.creditScore = calculateCreditScore(newState.player.credits);
        newState.wrongAnswers = 0;
        
        newState.currentFight += 1;
        
        newState.notifications.push({
            type: "success",
            message: `✅ Correct! +${CREDITS_PER_CORRECT} credits. Your credit score is now ${newState.player.creditScore}.`,
            timestamp: Date.now()
        });
    } else {
        newState.wrongAnswers += 1;
        
        if (newState.wrongAnswers >= MAX_WRONG_ANSWERS_PER_QUEST) {
            newState.player.credits = Math.max(0, newState.player.credits + CREDITS_PER_WRONG);
            newState.player.creditScore = calculateCreditScore(newState.player.credits);
            newState.currentFight = 0;
            newState.wrongAnswers = 0;
            shouldResetQuest = true;
            
            newState.notifications.push({
                type: "warning",
                message: `Too many wrong answers! Quest reset. Lost ${Math.abs(CREDITS_PER_WRONG)} credits.`,
                timestamp: Date.now()
            });
        } else {
            const remaining = MAX_WRONG_ANSWERS_PER_QUEST - newState.wrongAnswers;
            newState.notifications.push({
                type: "warning",
                message: `Wrong answer. ${remaining} wrong answer${remaining !== 1 ? 's' : ''} remaining before quest reset.`,
                timestamp: Date.now()
            });
        }
    }
    
    saveGameState(newState);
    
    return { newState, isCorrect, shouldResetQuest };
}


export function isQuestComplete(state: GameState): boolean {
    const currentQuest = state.currentQuest;
    const totalQuestions = QUESTIONS_PER_QUEST[currentQuest] || 0;
    return state.currentFight >= totalQuestions;
}


export function completeQuest(state: GameState): GameState {
    const currentQuest = state.currentQuest;
    const newState = { ...state };
    
    if (!newState.player.completedQuests.includes(currentQuest)) {
        newState.player.completedQuests.push(currentQuest);
    }
    
    const currentIndex = QUEST_ORDER.indexOf(currentQuest);
    if (currentIndex < QUEST_ORDER.length - 1) {
        const nextQuest = QUEST_ORDER[currentIndex + 1];
        if (!newState.player.unlockedQuests.includes(nextQuest)) {
            newState.player.unlockedQuests.push(nextQuest);
        }
    }
    
    newState.currentFight = 0;
    newState.wrongAnswers = 0;
    
    newState.notifications.push({
        type: "success",
        message: `Quest ${currentQuest} completed!`,
        timestamp: Date.now()
    });
    
    saveGameState(newState);
    return newState;
}


export function startQuest(state: GameState, questId: QuestId): GameState {
    if (!state.player.unlockedQuests.includes(questId)) {
        return state;
    }
    
    const newState: GameState = {
        ...state,
        currentQuest: questId,
        currentFight: 0,
        wrongAnswers: 0
    };
    
    // Clear selected final question when starting a new quest
    delete newState.selectedFinalQuestion;
    
    // For quest4, pre-select a random question from quest4's question pool
    if (questId === "quest4") {
        const quest4Questions = getQuest4Questions();
        if (quest4Questions.length > 0) {
            const selectedQuestion = getRandomElement(quest4Questions);
            newState.selectedFinalQuestion = selectedQuestion;
        }
    }
    
    saveGameState(newState);
    return newState;
}


export function chooseBank(state: GameState, bankChoice: BankChoice): GameState {
    const newState = { ...state };
    newState.player.bankChoice = bankChoice;
    
    if (bankChoice === "good") {
        if (newState.player.credits >= CREDITS_FOR_GOOD_BANK) {
            newState.notifications.push({
                type: "success",
                message: `Great choice! You opened an account at Good Bank. No fees, and your money grows!`,
                timestamp: Date.now()
            });
        } else {
            newState.notifications.push({
                type: "info",
                message: `You chose Good Bank, but you need ${CREDITS_FOR_GOOD_BANK} credits to open an account. Keep earning credits!`,
                timestamp: Date.now()
            });
        }
    } else if (bankChoice === "bad") {
        newState.player.credits = Math.max(0, newState.player.credits - BAD_BANK_MONTHLY_FEE);
        newState.player.creditScore = calculateCreditScore(newState.player.credits);
        
        newState.notifications.push({
            type: "warning",
            message: `You chose Bad Bank. Monthly fee of ${BAD_BANK_MONTHLY_FEE} credits charged. Your credit score is now ${newState.player.creditScore}.`,
            timestamp: Date.now()
        });
    }
    
    saveGameState(newState);
    return newState;
}


export function canOpenGoodBank(state: GameState): boolean {
    return state.player.credits >= CREDITS_FOR_GOOD_BANK;
}


export function addReward(state: GameState, reward: InventoryItem): GameState {
    const newState = { ...state };
    
    // Check if reward already exists
    if (!newState.player.inventory.find((item: InventoryItem) => item.id === reward.id)) {
        newState.player.inventory.push(reward);
        
        newState.notifications.push({
            type: "success",
            message: `Reward earned: ${reward.name}! ${reward.description}`,
            timestamp: Date.now()
        });
    }
    
    saveGameState(newState);
    return newState;
}


/**
 * Get all questions available for quest4 (random selection)
 */
function getQuest4Questions(): Question[] {
    return QUESTIONS.quest4 || [];
}

export function getCurrentQuestion(state: GameState): Question | null {
    const currentQuest = state.currentQuest;
    const currentFight = state.currentFight;
    
    // For quest4, use a randomly selected question from quest4's question pool
    if (currentQuest === "quest4") {
        // If no question has been selected yet, select one randomly from quest4 questions
        if (!state.selectedFinalQuestion) {
            const quest4Questions = getQuest4Questions();
            if (quest4Questions.length === 0) {
                return null;
            }
            // Select a random question from quest4's question pool
            const selectedQuestion = getRandomElement(quest4Questions);
            // Store it in state (this will be saved when answerQuestion is called)
            return selectedQuestion;
        }
        return state.selectedFinalQuestion;
    }
    
    // For other quests, use the predetermined questions
    const questions = QUESTIONS[currentQuest as keyof typeof QUESTIONS];
    
    if (!questions || currentFight >= questions.length) {
        return null;
    }
    
    return questions[currentFight];
}

export function getQuestProgress(state: GameState): { current: number; total: number } {
    const currentQuest = state.currentQuest;
    const total = QUESTIONS_PER_QUEST[currentQuest] || 0;
    return {
        current: state.currentFight,
        total
    };
}

export function isGameWon(state: GameState): boolean {
    return state.player.bankChoice === "good" && canOpenGoodBank(state);
}


export function areAllQuestsComplete(state: GameState): boolean {
    return QUEST_ORDER.every(questId => state.player.completedQuests.includes(questId));
}

export function getRecentNotifications(state: GameState, limit: number = 5): GameState["notifications"] {
    return state.notifications
        .slice(-limit)
        .sort((a: { timestamp: number }, b: { timestamp: number }) => b.timestamp - a.timestamp);
}


export function clearNotifications(state: GameState, olderThanMs: number = 5000): GameState {
    const now = Date.now();
    const newState = {
        ...state,
        notifications: state.notifications.filter((n: { timestamp: number }) => (now - n.timestamp) < olderThanMs)
    };
    return newState;
}
