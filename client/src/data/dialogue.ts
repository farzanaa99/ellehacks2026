//all the dialogue for last banker, mc, apocolypse npc, enemies comes here
// data/dialogue.ts
import type { QuestId } from "../game/types";

export type DialogueEntry = {
    id: string;
    speaker: string; // "Player", "Last Banker", "Influx", "Mind-controlled NPC".
    text: string;
    questId?: string; // Optional: if dialogue is quest-specific
    sceneType: "pre-quest" | "pre-boss" | "general";
};

export type SceneType = "pre-quest" | "pre-boss" | "general";

// Type definitions for the dialogue structure
export type HomeBaseDialogue = Record<QuestId, DialogueEntry[]>;

export type BossSceneDialogue = {
    quest4: DialogueEntry[]; // Influx dialogues for final boss
};

export type DialogueStructure = {
    homeBase: HomeBaseDialogue;
    introScene: DialogueEntry[]; // NPC scene occurs once before first transition to home base
    bossScene: BossSceneDialogue;
};

export const DIALOGUE: DialogueStructure = {
    homeBase: {
        quest1: [
            {
            id: "bankerQ1_1",
            speaker: "The Last Banker",
            text: "It's my job to know. To create a bank account with us there's some things you are going to need to learn.",
            sceneType: "general"
        },
          {
            id: "bankerQ1_2",
            speaker: "The Last Banker",
            text: "First when opening a bank account, you may be asked what type of account, checking or savings account?",
            sceneType: "general"
        },

        {
            id: "bankerQ1_3",
            speaker: "The Last Banker",
            text: "A checking account is great for everyday needs like depositing paycheques, paying bills, and withdrawing money from the bank. Checking accounts typically have lower transaction fee but a lower interest rate.",
            sceneType: "general"
        },
        {
            id: "bankerQ1_4",
            speaker: "The Last Banker",
            text: "A savings account, like the name implies, is great for long term saving and budgeting. In a savings account your money earns more, since it has a higher interest rate.",
            sceneType: "general"
        },
        {
            id: "bankerQ1_5",
            speaker: "The Last Banker",
            text: "Oh how could I forget you're also going to need a card!",
            sceneType: "general"
        },
         {
            id: "bankerQ1_6",
            speaker: "The Last Banker",
            text: "A debit card allows you to have direct access to the money in your checking account. Though you don’t want to use more money than you have in your checking account.",
            sceneType: "general"
        },
         {
            id: "bankerQ1_7",
            speaker: "The Last Banker",
            text: "A credit card allows you to borrow money from the bank from a set limit. A credit card can be helpful for building a credit score. Though you must be cautious about paying the bank on time, otherwise you may have to pay interest charges.",
            sceneType: "general"
        },
  {
            id: "bankerQ1_7",
            speaker: "The Last Banker",
            text: "Now go deal with those creatures and in return I will help you with setting up a bank account.",
            sceneType: "general"
        }
        ],
        quest2: [
             {
            id: "bankerQ2_1",
            speaker: "The Last Banker",
            text: "I fear your adventure is not over yet. I fear Influx Inc has released Loan Sharks into the streets. You will need to learn about loans to defeat them.",
            sceneType: "general"
        },
          {
            id: "bankerQ2_2",
            speaker: "The Last Banker",
            text: "First of all, what is a loan? A loan is a form of credit where a specific amount of money is given, and paid back later. In most cases the bank/lender will add interest to the initial to the principal value.",
            sceneType: "general"
        },

         {
            id: "bankerQ2_3",
            speaker: "The Last Banker",
            text: "Before you can take out a loan the bank will collect different information like your credit score to help determine the details of the loan. It will help determine your loan term, interest rate, loan payments.",
            sceneType: "general"
        },
        {
            id: "bankerQ2_4",
            speaker: "The Last Banker",
            text: "The main types of loans that an adventurer like you will run into are student loans, personal loans, and payday loans.",
            sceneType: "general"
        },
        {
            id: "bankerQ2_5",
            speaker: "The Last Banker",
            text: "Now go and bring me back a tooth!",
            sceneType: "general"
        }
        
        ],
        quest3: [
           {
            id: "bankerQ3_1",
            speaker: "The Last Banker",
            text: "Ahh I see those sharks were no match for you!",
            sceneType: "general"
        },
        {
            id: "bankerQ3_2",
            speaker: "The Last Banker",
            text: "I hate to ask for your help again but Influx Inc never stops. After your swift defeat of their loan sharks they have released Auto-Clock, when they finish counting down they destroy any chance of achieving financial freedom.",
            sceneType: "general"
        },
         {
            id: "bankerQ3_3",
            speaker: "The Last Banker",
            text: "You must arm yourself with the power of investing!!",
            sceneType: "general"
        },
        {
            id: "bankerQ3_4",
            speaker: "The Last Banker",
            text: "Investing is a critical tool for achieving financial freedom. Investing is when you put money into assets with the hope that the asset will gain appreciation. There are many different types of assets for example stocks, bonds and protofilos, each with their own benefits and risks.",
            sceneType: "general"
        },
         {
            id: "bankerQ3_5",
            speaker: "The Last Banker",
            text: "Don’t worry we are relying on more than hope for our assets to appreciate. Investments increase in value through compounding interest. Over time this compounding can significantly increase the value of your assets. However that’s not the only factor to consider, you must consider fees that you will have to pay. High fees can significantly reduce your overall returns.",
            sceneType: "general"
        },
         {
            id: "bankerQ3_6",
            speaker: "The Last Banker",
            text: "The best way to maximize your investment is by starting early, the earlier you start the more time your assets have to appreciate. As well as diversifying your portfolio, can help reduce possible risks.",
            sceneType: "general"
        },
         {
            id: "bankerQ3_7",
            speaker: "The Last Banker",
            text: "Lastly you can always speak with an expert financial advisor like me to help pick the best portfolio for you. Now off you go, and bring me back an arm!",
            sceneType: "general"
        },
        ],
        quest4: [
            // Dialogues shown at home base before final boss
            // Add dialogue entries here
        ],
    },
    introScene: [
        // NPC scene occurs once, right before the first transition to home base
        // Conversation between Player and NPC 1 (mind-controlled NPC)
        
        {
            id: "player_1",
            speaker: "Elli",
            text: "Today's the day! The day where I get to open up my first bank account.",
            sceneType: "pre-quest"
        },
    
        {
            id: "player_2",
            speaker: "Elli",
            text: "What is this place?",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_1",
            speaker: "The Last Banker",
            text: "Oh a customer how can I help you?",
            sceneType: "pre-quest"
        },
         {
            id: "player_3",
            speaker: "Elli",
            text: "Wow what is this place?",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_2",
            speaker: "The Last Banker",
            text: "Why its a bank of course. The second best bank in Cyber Pink",
            sceneType: "pre-quest"
        },
         {
            id: "player_4",
            speaker: "Elli",
            text: "I didn’t know there was a second bank in Cyber Pink.",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_3",
            speaker: "The Last Banker",
            text: "Well we are! What can I help you with? Perhaps a bank account?",
            sceneType: "pre-quest"
        },
        {
            id: "player_5",
            speaker: "Elli",
            text: "What how did you know?",
            sceneType: "pre-quest"
        },
//end of intro dialoge
    ],
    bossScene: {
        quest4: [
            // Influx dialogues for final boss
            // Add dialogue entries here
        ],
    },
};

/**
 * Get dialogues for home base based on the next quest
 * @param questId - The quest ID for which to fetch home base dialogues
 * @returns Array of dialogue entries for the home base scene
 */
export function getHomeBaseDialogue(questId: QuestId): DialogueEntry[] {
    return DIALOGUE.homeBase[questId] || [];
}

/**
 * Get NPC scene dialogues (occurs once before first transition to home base)
 * @returns Array of dialogue entries for the NPC scene
 */
export function getNpcSceneDialogue(): DialogueEntry[] {
    return DIALOGUE.introScene || [];
}

/**
 * Get boss dialogues (primarily for Influx in quest4)
 * @param questId - The quest ID (currently only quest4 has boss dialogues)
 * @returns Array of dialogue entries for the boss scene
 */
export function getBossDialogue(questId: QuestId): DialogueEntry[] {
    if (questId === "quest4") {
        return DIALOGUE.bossScene.quest4 || [];
    }
    return [];
}