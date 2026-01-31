
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface DeathPageProps {
  onRetry: () => void;
  message?: string;
}

export const DeathPage = ({ onRetry, message = "You have been defeated!" }: DeathPageProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(50,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Card style={{ maxWidth: '450px', padding: '2rem', textAlign: 'center', border: '2px solid #ff3333', boxShadow: '0 0 20px #ff0000, inset 0 0 10px rgba(255,0,0,0.3)' }}>
        <h2 style={{ fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif', fontSize: '1.8rem', marginBottom: '1rem', color: '#ff5555' }}>
          {message}
        </h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#ffaaaa' }}>
          Better luck next time! Try again to conquer the quest.
        </p>
        <Button onClick={onRetry}>Retry</Button>
      </Card>
    </div>
  );
};
