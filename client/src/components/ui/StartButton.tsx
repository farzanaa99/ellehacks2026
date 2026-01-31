// components/ui/StartButton.tsx

import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Temporarily disabled

export default function StartButton() {
  // const navigate = useNavigate(); // Temporarily disabled
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    // Temporarily disabled - home page not ready
    // navigate('/home');
    console.log('Start button clicked - home page not yet implemented');
  };

  return (
    <button
      onClick={handleStart}
      style={{
        position: 'fixed',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '1rem 3rem',
        fontSize: '1.5rem',
        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.87)',
        backgroundColor: '#1a1a1a',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'opacity 0.8s ease, all 0.3s ease',
        opacity: opacity,
        zIndex: 1002,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2a2a2a';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1a1a1a';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
      }}
    >
      START
    </button>
  );
}
