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
        "Savings",
        "Checking"
        
      ],
      answer: 1
    },
    
    {
      id: "q3",
      question: "You have the choice between two banks. Celestial Corp offers 2.25% annual interest, Influx Inc offers 0.5%. Who do you go with?",
      options: [
        "Influx Inc - 0.5% interest",
        "Celestial Corp - 2.25% interest",
        "Either one is fine, interest rates don't matter",
        "Don't use banks"
      ],
      answer: 1,
      explanation: "Celestial Corp has the better rate. A higher interest rate means you will earn more money."
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
      question: "Ella wants to buy a new bike, but she doesn't have enough. What should she do?",
      options: [
        "Ella should take out a Payday loan, borrow $50, pay back $150",
        "Ella should budget and save up for the bike over time",
        "Ella should steal the money from her mom's purse",
        "Ella shouldn't buy the bike at all"
      ],
      answer: 1
    },
    {
      id: "q2",
      question: "True or False: You have to pay back grants in full including any interest fees.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q3",
      question: "Fill in the blank: _______ is the amount of time that you have to repay a loan.",
      options: [
        "Loan rate",
        "Interest rate",
        "Loan term",
        "Interest term"
      ],
      answer: 2
    },
    {
      id: "q4",
      question: "True or False: Payday loans are low risk and a good way to borrow money for small purchases.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q5",
      question: "True or False: You should never take out a loan, it is too risky.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q6",
      question: "Carly needs a loan of $3000 and is deciding between two loans. Celestial Corp is offering a loan with a principal of $5000 and an interest rate of 3.95%. Influx Inc is offering a loan with a principal of $7500 and an interest rate of 6%. Which loan should Carly take?",
      options: [
        "Carly should take the Celestial Corp loan",
        "Carly should take the Influx Inc loan",
        "Carly should take both loans"
      ],
      answer: 0
    },
{
      id: "q7",
      question: "Fill in the blank: _______ allow you to borrow a fixed amount of money and pay it back over a certain period.",
      options: [
        "Student Loans",
        "Mortgage",
        "Personal Loans",
        "Payday Loans"
      ],
      answer: 2
    },
    {
      id: "q8",
      question: "Why are student loans generally considered lower risk than some other loans?",
      options: [
        "They usually have lower interest rates and flexible repayment options",
        "They lend more money on average",
        "They never have to be paid back",
        "They aren't considered lower risk, they are one of the riskest loans"
      ],
      answer: 0
    },
    {
      id: "q9",
      question: "Why do banks use to decide what kind of loan you have?",
      options: [
        "Credit Score",
        "Credit Limit",
        "Interest Rate",
        "All of the above"
      ],
      answer: 0
    },
 ],
  quest3: [
    {
      id: "q1",
      question: "Who is investing made for?",
      options: [
        "Teens",
        "Parents",
        "Old business men",
        "Everybody"
      ],
      answer: 3
    },
    {
      id: "q2",
      question: "Fill in the blank: _______ is a type of investment that represents ownership in a company.",
      options: [
        "Stocks",
        "Bonds",
        "Portfolios",
        "Assets"
      ],
      answer: 0
    },
    {
      id: "q3",
      question: "Charlie wants to start investing, so they decided to put all their investment money into Influx Inc Stock. Is this a good idea?",
      options: [
        "This is a good idea! By putting all their money into one stock, Charlie will maximize their profit.",
        "This is a bad idea! Charlie should put their money into a savings account instead, they are too young to start investing.",
        "This is a good idea! This will help Charlie minimize any potential risk.",
        "This is a bad idea! Charlie should diversify their portfolio to help minimize risk."
      ],
      answer: 3
    },
     {
      id: "q4",
      question: "Zainab has been saving for a few months. She wants to grow her wealth to help save for the future. What should she do?",
      options: [
        "Zainab should keep putting money into her savings account. The interest from her savings account will help grow her money over time",
        "Zainab should talk to a financial advisor, to help her pick some long-term investments to help her grow her money.",
        "Zainab should let her best friend’s uncle’s barber recommend which investments to put her money into.",
        "Zainab should just give up its too hard trying to figure how to start investing"
      ],
      answer: 1
    },
     {
      id: "q5",
      question: "True or False: Fees don't matter when it comes to deciding between investments.",
      options: [
        "True",
        "False"
      ],
      answer: 1
    },
    {
      id: "q6",
      question: "Investing is a critical part of ensuring financial security.",
      options: [
        "True",
        "False"
      ],
      answer: 0
    },
    {
      id: "q7",
      question: "What does appreciation mean in investing?",
      options: [
        "Borrowing money",
        "The increase in value of an investment",
        "A fee you to pay to the bank",
        "Losing money over time"
      ],
      answer: 1
    },
     {
      id: "q8",
      question: "Why might high fees be a problem?",
      options: [
        "They decrease appreciation over time",
        "They help elimante risk",
        "High fees actually benefit you, the higher you pay the more you earn",
        "They reduce the overall money made over time"
      ],
      answer: 3
    },
  ],
  quest4: [
    
    {
      id: "q1",
      question: "You think you are so smart! Who should focus on investing?",
      options: [
        "Teens",
        "Parents",
        "Old Business Men",
        "Everybody"
      ],
      answer: 3
    },
    {
      id: "q2",
      question: "You have the choice between two savings accounts. Celestial Corp offers 2.25% annual interest, Influx Inc offers 0.5%. Who do you go with?",
      options: [
        "Influx Inc - 0.5% interest (Clearly the better bank and the correct option)",
        "Celestial Corp - 2.25% interest",
        "Either one is fine, interest rates don't matter",
        "Don't use banks"
      ],
      answer: 1,
     //explanation: "Celestial Corp has the better rate. A higher interest rate means you will earn more money."
    },
    {
      id: "q3",
      question: "Zainab has been saving for a few months. She wants to grow her wealth to help save for the future. What should she do?",
      options: [
        "Zainab should keep putting money into her savings account. The interest from her savings account will help grow her money over time",
        "Zainab should talk to a financial advisor, to help her pick some long-term investments to help her grow her money.",
        "Zainab should let her best friend’s uncle’s barber recommend which investments to put her money into.",
        "Zainab should just give up its too hard trying to figure how to start investing"
      ],
      answer: 1
    },
    {
      id: "q4",
      question: "In Ontario when do you have to start paying back the provinical part of your student loan?",
      options: [
        "You don't have to pay back your loan, its like a gift from the province.",
        "You need to make your first payment as soon as you graduate.",
        "You need to make your first payment 6 monthes after you either graduate or become a part time student.",
        "You need to make your first payment 1 year after you either graduate or become a part time student.", 
      ],
      answer: 2
    },
  ]
};
