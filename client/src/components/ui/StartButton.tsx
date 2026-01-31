// components/ui/StartButton.tsx

import { useNavigate } from 'react-router-dom';

export default function StartButton() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <button
      onClick={handleStart}
      style={{
        position: 'fixed',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1rem 3rem',
        fontSize: '1.5rem',
        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.87)',
        backgroundColor: '#1a1a1a',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 1000,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2a2a2a';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1a1a1a';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
      }}
    >
      START
    </button>
  );
}
