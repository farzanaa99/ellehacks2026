import type { Question, QuestId } from "../game/types";

export const QUESTIONS: Record<QuestId, Question[]> = {
  quest1: [
    {
      id: "q1",
      question: "You got $100 for your birthday! You need $20 for this weekend. Where should the rest go?",
      options: [
        "Chequing account - easy to spend anytime",
        "Savings account/TFSA - it grows over time",
        "Hide it in your room",
        "Spend it all now"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "You're buying a $30 hoodie. You have $50 in your account. Which card?",
      options: [
        "Credit card - buy now, pay later",
        "Debit card - use money you already have",
        "Doesn't matter, same thing",
        "Borrow from a friend"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "Time to pick a bank! Which one?",
      options: [
        "Good Bank - Free, no fees, money grows",
        "Bad Bank - $10/month fees, no benefits",
        "All banks are the same",
        "Don't use banks"
      ],
      answer: 0
    }
  ],
  quest2: [
    {
      id: "q1",
      question: "You need $50 for new headphones. Where should you borrow from?",
      options: [
        "Payday loan - borrow $50, pay back $150",
        "Friend's sketchy cousin",
        "Student loan - borrow $50, pay back $55",
        "Don't buy the headphones"
      ],
      answer: 2
    },
    {
      id: "q2",
      question: "You make $80 from babysitting. How should you split it?",
      options: [
        "Spend all $80 right now",
        "Save $15, spend $50, invest $15",
        "Save $1, spend $79",
        "Give it all to your parents"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "What's the difference between NEEDS and WANTS?",
      options: [
        "Everything you buy is a need",
        "Needs = must have (food, shelter), Wants = nice to have (games, snacks)",
        "Wants are more important than needs",
        "There's no difference"
      ],
      answer: 1
    }
  ],
  quest3: [
    {
      id: "q1",
      question: "Your aunt gives you $25. If you invest it, what happens?",
      options: [
        "It stays $25 forever",
        "It grows into more money over time",
        "You lose it all",
        "Nothing happens"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "What is compound interest?",
      options: [
        "A bank fee",
        "Your money makes money, then THAT money makes more money",
        "A type of loan",
        "Boring adult stuff"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "You're 15. When should you start saving/investing?",
      options: [
        "Wait until you're 30",
        "Wait until you're rich",
        "Start NOW - even small amounts grow big over time",
        "Never, just spend everything"
      ],
      answer: 2
    }
  ],
  boss: [
    {
      id: "b1",
      question: "FINAL CHALLENGE: What's the smartest money move for your future?",
      options: [
        "Spend everything, save nothing",
        "Save some, invest some, avoid bad debt, build credit",
        "Take lots of loans and figure it out later",
        "Keep cash under your mattress"
      ],
      answer: 1
    }
  ]
};