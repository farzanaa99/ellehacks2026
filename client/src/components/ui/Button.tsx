//DONE DO NOT CHANGE
import React from 'react';
import '../../styles/globals.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean; 
}

export const Button = ({ onClick, children, small }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: small ? '0.6rem 1.5rem' : '1rem 2.5rem',
        fontSize: small ? '1rem' : '1.3rem',
        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: 'rgba(20, 0, 20, 0.8)',
        border: '2px solid #ff00ff',
        borderRadius: '6px',
        cursor: 'pointer',
        zIndex: 1002,
        boxShadow: '0 0 12px #ff00ff, inset 0 0 8px rgba(255, 0, 255, 0.2)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(30, 0, 30, 0.9)';
        e.currentTarget.style.borderColor = '#ff66ff';
        e.currentTarget.style.boxShadow =
          '0 0 20px #ff00ff, 0 0 30px #ff00ff, inset 0 0 10px rgba(255, 0, 255, 0.3)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(20, 0, 20, 0.8)';
        e.currentTarget.style.borderColor = '#ff00ff';
        e.currentTarget.style.boxShadow = '0 0 12px #ff00ff, inset 0 0 8px rgba(255, 0, 255, 0.2)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
};
