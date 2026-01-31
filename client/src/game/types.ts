export type QuestId = "quest1" | "quest2" | "quest3" | "boss";
export type Quest = {
    id: QuestId;
    name: string;
    fights: number;
    rewardType?: "weapon" | "armor" | "ability";
    isBoss: boolean;

}

export type Question = {
    id:string;
    question: string;
    options: string[];
    answer: number;
};

export type PlayerState = {
    credits: number;
    clarity: number;
    hp: number;
}