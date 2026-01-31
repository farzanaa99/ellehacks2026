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
    npcScene: DialogueEntry[]; // NPC scene occurs once before first transition to home base
    bossScene: BossSceneDialogue;
};

export const DIALOGUE: DialogueStructure = {
    homeBase: {
        quest1: [
            // Dialogues shown at home base before quest1
            // Add dialogue entries here
        ],
        quest2: [
            // Dialogues shown at home base before quest2
            // Add dialogue entries here
        ],
        quest3: [
            // Dialogues shown at home base before quest3
            // Add dialogue entries here
        ],
        quest4: [
            // Dialogues shown at home base before final boss
            // Add dialogue entries here
        ],
    },
    npcScene: [
        // NPC scene occurs once, right before the first transition to home base
        // Conversation between Player and NPC 1 (mind-controlled NPC)
        {
            id: "npc1_1",
            speaker: "NPC 1",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "player_1",
            speaker: "Player",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_2",
            speaker: "NPC 1",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "player_2",
            speaker: "Player",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_3",
            speaker: "NPC 1",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "player_3",
            speaker: "Player",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_4",
            speaker: "NPC 1",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "player_4",
            speaker: "Player",
            text: "abc",
            sceneType: "pre-quest"
        },
        {
            id: "npc1_5",
            speaker: "NPC 1",
            text: "abc",
            sceneType: "pre-quest"
        },
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
    return DIALOGUE.npcScene || [];
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