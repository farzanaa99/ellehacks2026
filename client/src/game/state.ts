import type { PlayerState, QuestId } from "./types";
import { STARTING_HP } from "./constants";

export type GameState = {
    currentQuest: QuestId;
    currentFight: number;
    player: PlayerState;
    wrongAnswers: number;
}
export const INITIAL_GAME_STATE: GameState = {
    currentQuest: "quest1",
    currentFight: 0,
    wrongAnswers: 0,
    player: {
        hp: STARTING_HP,
        credits: 0,
        clarity: 0
    }
};