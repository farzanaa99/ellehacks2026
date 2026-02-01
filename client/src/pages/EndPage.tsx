import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../app/GameProvider';
import { resetGameState } from '../game/state';

export const EndPage = () => {
  const navigate = useNavigate();
  const { setGameState } = useGame();

  const handleHome = () => {
    // Reset game state to fresh
    const freshState = resetGameState();
    setGameState(freshState);
    
    // Navigate to home
    navigate('/'); 
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <Card
        style={{
          maxWidth: '450px',
          padding: '2rem',
          textAlign: 'center',
          border: '2px solid #00ff00',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          boxShadow: '0 0 15px rgba(0,255,0,0.5)',
        }}
      >
        <h2 style={{ color: '#00ff00', marginBottom: '1rem', fontFamily: '"Orbitron", system-ui', fontSize: '2rem' }}>
         🎉 Congratulations! You Won! 🎉
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#00ff88', marginBottom: '2rem' }}>
          You've mastered financial literacy and unlocked the Good Bank!
        </p>

        <Button onClick={handleHome}>Start New Game</Button>
      </Card>
    </div>
  );
};

export default EndPage;