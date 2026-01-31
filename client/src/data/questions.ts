//after quest starts these are the questions
import type { Question, QuestId } from "../game/types";

export const QUESTIONS: Record<QuestId, Question[]> = {
  quest1: [
    {
      id: "q1",
      question: "True or False: There is no point in starting a savings account as a teen.",

      options: [
        "True",
        "False"
      ],
      answer: 0
    },
    {
      id: "q2",
      question: "Fill in the blank: A ________ account typically has a lower transaction fee, making it great for everyday use.",
      options: [
        "Checking",
        "Savings"
      ],
      answer: 0
    },
    {
      id: "q3",
      question: "Fill in the blank: _____ account typically has a lower transaction fee, making it great for everyday use.",
      options: ["Checking", "Savings", "Investment", "Credit"],
      answer: 0,
      explanation: "A checking account is great for everyday use due to its lower transaction fee, for example paying recurring bills."
    },
    {
      id: "q4",
      question: "You have the choice between two banks. Celestial Corp offers 2.25% annual interest, Influx Inc offers 0.5%. Who do you go with?",
      options: ["Celestial Corp", "Influx Inc", "Doesn't matter", "Neither"],
      answer: 0,
      explanation: "Celestial Corp has the better rate. A higher interest rate means you will earn more money."
    },
    {
      id: "q5",
      question: "Which card directly uses money from your checking account?",
      options: ["Debit", "Credit", "Gift card", "Playing card"],
      answer: 0,
      explanation: "A debit card directly uses money from your checking account."
    },
    {
      id: "q6",
      question: "Oh no! You missed a credit card payment. What might the bank do?",
      options: [
        "Influx Inc - 0.5% interest",
        "Celestial Corp - 2.25% interest",
        "Either one is fine, interest rates don't matter",
        "Don't use banks"
      ],
      answer: 1
    },
    {
      id: "q4",
      question: "Which card directly uses money from your checking account?",
      options: [
        "Credit Card",
        "Gift Card",
        "Debit Card",
        "All of the above"
      ],
      answer: 2
    },
    {
      id: "q5",
      question: "Oh no! You missed a credit card payment deadline. What happens now?",
      options: [  
      "Nothing, it's fine everyone misses deadlines sometimes",
      "You may be charged interest on top of what you owe and it can hurt your credit score",
      "Just pay next month, it will all even out",
      "Your credit card company will forgive you this one time"
      ],
      answer: 1
    },
    {
      id: "q6",
      question: "True or False: With a debit card, you can spend more money than you have in your checking account.",
      options: [
        "True",
        "False"
      ],
      answer: 1 
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
  quest4: [
    {
      id: "q1",
      question: "FINAL CHALLENGE: What's the smartest money move for your future?",
      options: [
        "Spend everything, save nothing",
        "Save some, invest some, avoid bad debt, build credit",
        "Take lots of loans and figure it out later",
        "Keep cash under your mattress"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "FINAL CHALLENGE: You've learned about banking, budgeting, and investing. What's the best financial strategy?",
      options: [
        "Only save money, never invest",
        "Balance saving, investing, and smart spending",
        "Spend everything you earn",
        "Only use credit cards for everything"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "FINAL CHALLENGE: Which combination helps you build wealth over time?",
      options: [
        "High-interest debt and no savings",
        "Good bank account, smart budgeting, early investing",
        "Spending all your money immediately",
        "Avoiding banks completely"
      ],
      answer: 1
    }
  ]
};
