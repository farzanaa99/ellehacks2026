//DONE - DO NOT CHANGE
import { useState, useEffect } from 'react';

export default function StartButton() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    console.log('Start button clicked - home page not yet implemented');
    // Temporarily disabled - home page not ready
    // navigate('/home');
    console.log('Start button clicked - home page not yet implemented');
  };

  return (
    <>
      <style>{`
        @keyframes glitch {
          0%, 95% {
            text-shadow: none;
            transform: translate(0);
          }
          96% {
            text-shadow: 
              2px 0 #ff0000,
              -2px 0 #cc0000;
            transform: translate(2px, -2px);
          }
          97% {
            text-shadow: 
              -2px 0 #ff0000,
              2px 0 #cc0000;
            transform: translate(-2px, 2px);
          }
          98% {
            text-shadow: 
              2px 0 #ff0000,
              -2px 0 #cc0000;
            transform: translate(2px, 2px);
          }
          99% {
            text-shadow: 
              -2px 0 #ff0000,
              2px 0 #cc0000;
            transform: translate(-2px, -2px);
          }
          100% {
            text-shadow: none;
            transform: translate(0);
          }
        }
      `}</style>
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
          color: '#ffffff',
          backgroundColor: 'rgba(20, 0, 20, 0.8)',
          border: '2px solid #ff00ff',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'opacity 0.8s ease, all 0.3s ease',
          opacity: opacity,
          zIndex: 1002,
          boxShadow: '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 0, 255, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(30, 0, 30, 0.9)';
          e.currentTarget.style.borderColor = '#ff66ff';
          e.currentTarget.style.boxShadow = '0 0 30px #ff00ff, 0 0 40px #ff00ff, inset 0 0 30px rgba(255, 0, 255, 0.3)';
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(20, 0, 20, 0.8)';
          e.currentTarget.style.borderColor = '#ff00ff';
          e.currentTarget.style.boxShadow = '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 0, 255, 0.2)';
          e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
        }}
      >
        <span
          style={{
            display: 'inline-block',
            animation: 'glitch 0.4s infinite',
          }}
        >
          START
        </span>
      </button>
    </>
  );
}
