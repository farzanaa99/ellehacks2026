// TO FIX -- this is for INFO CARDS RECIEVED FROM LAST BANKER
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  width?: string; // optional: default width
  height?: string; // optional: default height
  style?: React.CSSProperties; // allow extra custom styles
}

export const Card = ({ children, width = '400px', height = 'auto', style }: CardProps) => {
  return (
    <div
      style={{
        width,
        height,
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(20, 0, 20, 0.8)',
        backdropFilter: 'blur(4px)',
        border: '2px solid #ff00ff',
        boxShadow: '0 0 20px #ff00ff, inset 0 0 15px rgba(255, 0, 255, 0.2)',
        color: '#fff',
        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontSize: '1rem',
        lineHeight: '1.5',
        zIndex: 1000,
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
