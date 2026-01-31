import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface DeathPageProps {
  message?: string;
}

export const DeathPage = ({ message = "You have been defeated!" }: DeathPageProps) => {
  const navigate = useNavigate();

  const handleRestart = () => {
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
        backgroundColor: 'rgba(0,0,0,0.95)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Card
        style={{
          maxWidth: '450px',
          padding: '2rem',
          textAlign: 'center',
          border: '2px solid #ff3333', // red border only
          backgroundColor: 'rgba(20,20,20,0.95)', // neutral card color
          boxShadow: '0 0 15px rgba(255,0,0,0.5)', // subtle red glow
        }}
      >
        <h2
          style={{
            fontFamily: '"Orbitron", system-ui',
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: '#ff5555', // red title
          }}
        >
          {message}
        </h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#ffaaaa' }}>
          Better luck next time! Try again to conquer the quest.
        </p>
        <Button onClick={handleRestart}>Restart</Button>
      </Card>
    </div>
  );
};

export default DeathPage;
