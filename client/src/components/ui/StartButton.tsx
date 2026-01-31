//DONE - DO NOT CHANGE
import { useState, useEffect } from 'react';

interface StartButtonProps {
  onClick?: () => void; // optional prop
}

export default function StartButton({ onClick }: StartButtonProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes glitch {
          0%, 95% { text-shadow: none; transform: translate(0); }
          96% { text-shadow: 2px 0 #ff0000, -2px 0 #cc0000; transform: translate(2px, -2px); }
          97% { text-shadow: -2px 0 #ff0000, 2px 0 #cc0000; transform: translate(-2px, 2px); }
          98% { text-shadow: 2px 0 #ff0000, -2px 0 #cc0000; transform: translate(2px, 2px); }
          99% { text-shadow: -2px 0 #ff0000, 2px 0 #cc0000; transform: translate(-2px, -2px); }
          100% { text-shadow: none; transform: translate(0); }
        }
      `}</style>

      <button
        onClick={onClick} // use the prop instead of internal handler
        style={{
          position: 'fixed',
          top: '62%',
          left: '50%',
          transform: 'translate(-50%, 0)',
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
          transformOrigin: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(30, 0, 30, 0.9)';
          e.currentTarget.style.borderColor = '#ff66ff';
          e.currentTarget.style.boxShadow =
            '0 0 30px #ff00ff, 0 0 40px #ff00ff, inset 0 0 30px rgba(255, 0, 255, 0.3)';
          e.currentTarget.style.transform = 'translate(-50%, 0) scale(1.03)';
          e.currentTarget.style.willChange = 'transform';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(20, 0, 20, 0.8)';
          e.currentTarget.style.borderColor = '#ff00ff';
          e.currentTarget.style.boxShadow =
            '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 0, 255, 0.2)';
          e.currentTarget.style.transform = 'translate(-50%, 0) scale(1)';
          e.currentTarget.style.willChange = 'auto';
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
