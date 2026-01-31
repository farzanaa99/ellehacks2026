export type QuestId = "quest1" | "quest2" | "quest3";

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