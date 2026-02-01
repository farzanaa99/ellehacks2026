
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const HomeBasePage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/intro');
  }; 

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0010 0%, #1a0020 100%)',
        color: '#fff',
        position: 'relative',
      }}
    >

      <Card
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          padding: '2.5rem',
          border: '2px solid #ff00ff',
          boxShadow: '0 0 20px #ff00ff, inset 0 0 15px rgba(255,0,255,0.2)',
        }}
      >
        <h1
          style={{
            fontFamily: '"Orbitron", system-ui',
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#ff66ff',
          }}
        >
          Cyber Pink
        </h1>

        <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
          A financial literacy adventure built for the
          <strong> Wealthsimple Challenge</strong> at
          <strong> ElleHacks 2026</strong>.
        </p>

        <p style={{ marginBottom: '2rem', fontSize: '0.95rem', opacity: 0.8 }}>
          Learn how banking, saving, and investing work by playing through quests,
          defeating monsters, and making smart money choices.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={startGame}>▶ Play Game</Button>
        </div>
      </Card>
    </div>
  );
};

export default HomeBasePage;
