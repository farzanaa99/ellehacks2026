import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { InventoryItem } from '../game/types';
import { useNavigate } from 'react-router-dom';

interface EndPageProps {
  stats: {
    correctAnswers: number;
    totalQuestions: number;
    rewards: InventoryItem[];
  };
}

export const EndPage = ({ stats }: EndPageProps) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home'); // back to HomeBasePage
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)', // subtle grey overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <Card
        style={{
          maxWidth: '500px',
          padding: '2rem',
          textAlign: 'center',
          border: '2px solid #00ff00', // green border only
          backgroundColor: 'rgba(20,20,20,0.95)', // neutral card color
          boxShadow: '0 0 15px rgba(0,255,0,0.5)', // subtle green glow
        }}
      >
        <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>
          🎉 Congratulations! You Won! 🎉
        </h2>

        <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
          You completed the challenge and earned rewards!
        </p>

        <div style={{ margin: '1rem 0' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Rewards Earned:</h3>
          {stats.rewards.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '0.5rem 1rem',
                margin: '0.3rem 0',
                border: '2px solid #00ff00', // green border
                borderRadius: '6px',
                backgroundColor: 'rgba(0,30,0,0.9)', // neutral dark
                color: '#fff',
                fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
              }}
            >
              {item.name} ({item.type})
            </div>
          ))}
        </div>

        <Button onClick={handleHome}>Back to Home</Button>
      </Card>
    </div>
  );
};

export default EndPage;
