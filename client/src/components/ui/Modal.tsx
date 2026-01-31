import React from 'react';

export type ModalType = 'dialogue' | 'title';

interface ModalProps {
  type: ModalType;
  children: React.ReactNode;
  questName?: string;
  playerState?: {
    hp?: number;
    credits?: number;
    clarity?: number;
    creditScore?: string;
  };
  style?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({ 
  type, 
  children, 
  questName, 
  playerState,
  style 
}) => {
  const isDialogue = type === 'dialogue';
  const isTitle = type === 'title';

  // Base styles matching the cyberpunk aesthetic
  const baseStyles: React.CSSProperties = {
    position: 'fixed',
    backgroundColor: 'rgba(20, 0, 20, 0.85)',
    backdropFilter: 'blur(4px)',
    border: '2px solid #ff00ff',
    borderRadius: '12px',
    boxShadow: '0 0 20px #ff00ff, inset 0 0 15px rgba(255, 0, 255, 0.2)',
    color: '#fff',
    fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
    zIndex: 1001, // Above background elements
    transition: 'all 0.3s ease',
    ...style,
  };

  // Dialogue box styles: bottom center, 90% width
  const dialogueStyles: React.CSSProperties = {
    ...baseStyles,
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '1200px',
    padding: '1.5rem 2rem',
    minHeight: '120px',
  };

  // Title box styles: top center, compact size
  const titleStyles: React.CSSProperties = {
    ...baseStyles,
    top: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto',
    maxWidth: '600px',
    padding: '1rem 2rem',
    minHeight: '60px',
  };

  const containerStyle = isDialogue ? dialogueStyles : titleStyles;

  return (
    <div style={containerStyle}>
      {/* Quest/Player State Display - only show for title box */}
      {isTitle && (questName || playerState) && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid rgba(255, 0, 255, 0.3)',
        }}>
          {questName && (
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#ff00ff',
              textShadow: '0 0 10px rgba(255, 0, 255, 0.5)',
            }}>
              Quest: {questName}
            </div>
          )}
          {playerState && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              fontSize: '0.9rem',
              flexWrap: 'wrap',
              color: 'rgba(255, 255, 255, 0.8)',
            }}>
              {playerState.hp !== undefined && (
                <span>HP: <strong style={{ color: '#ff00ff' }}>{playerState.hp}</strong></span>
              )}
              {playerState.credits !== undefined && (
                <span>Credits: <strong style={{ color: '#ff00ff' }}>{playerState.credits}</strong></span>
              )}
              {playerState.clarity !== undefined && (
                <span>Clarity: <strong style={{ color: '#ff00ff' }}>{playerState.clarity}</strong></span>
              )}
              {playerState.creditScore && (
                <span>Score: <strong style={{ color: '#ff00ff' }}>{playerState.creditScore}</strong></span>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Main content */}
      <div style={{
        fontSize: isDialogue ? '1rem' : '0.95rem',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
      }}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
