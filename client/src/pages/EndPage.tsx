import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const EndPage = () => {
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
        backgroundColor: 'rgba(0, 0, 0, 0.95)', // subtle overlay
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
          border: '2px solid #00ff00', // green border only
          backgroundColor: 'rgba(0, 0, 0, 0.95)', // neutral card color
          boxShadow: '0 0 15px rgba(0,255,0,0.5)', // subtle green glow
        }}
      >
        <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>
         Congratulations! You Won!
        </h2>

        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>
          You completed the challenge!
        </p>

        <Button onClick={handleHome}>Back to Home</Button>
      </Card>
    </div>
  );
};

export default EndPage;
