// components/ui/QuestionCard.tsx
import { Card } from '../ui/Card';
import type { QuestId } from '../../game/types';
import { QUESTIONS } from '../../data/questions';

interface QuestionCardProps {
  questId: QuestId;
  questionIndex: number;
  onAnswer: (selectedOption: number, correct: boolean) => void;
}

export const QuestionCard = ({ questId, questionIndex, onAnswer }: QuestionCardProps) => {
  const question = QUESTIONS[questId][questionIndex];

  if (!question) return <p>No question found.</p>;

  const handleClick = (optionIndex: number) => {
    const correct = optionIndex === question.answer;
    onAnswer(optionIndex, correct);
  };

  return (
    <Card style={{ maxWidth: '500px', margin: '1rem auto' }}>
      <p style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
        {question.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              padding: '0.5rem 1rem',
              fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#ffffff',
              backgroundColor: 'rgba(30, 0, 30, 0.8)',
              border: '2px solid #ff00ff',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 0 12px #ff00ff, inset 0 0 8px rgba(255, 0, 255, 0.2)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(40, 0, 40, 0.9)';
              e.currentTarget.style.borderColor = '#ff66ff';
              e.currentTarget.style.boxShadow =
                '0 0 20px #ff00ff, 0 0 30px #ff00ff, inset 0 0 10px rgba(255, 0, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 0, 30, 0.8)';
              e.currentTarget.style.borderColor = '#ff00ff';
              e.currentTarget.style.boxShadow =
                '0 0 12px #ff00ff, inset 0 0 8px rgba(255, 0, 255, 0.2)';
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  );
};
