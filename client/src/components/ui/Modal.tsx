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

  const baseStyles: React.CSSProperties = {
    position: 'fixed',
    backgroundColor: 'rgba(15, 0, 15, 0.98)',
    backdropFilter: 'blur(10px)',
    border: '2px solid #ff00ff',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(255, 0, 255, 0.3), inset 0 0 20px rgba(255, 0, 255, 0.1)',
    color: '#fff',
    fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
    zIndex: 1001, 
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    ...style,
  };

  const dialogueStyles: React.CSSProperties = {
    ...baseStyles,
    top: '50%',                        // Lifted slightly above center
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1100px',                   // Fixed non-resizable width
    height: '650px',                   // Fixed non-resizable height
    maxWidth: '95vw',
    maxHeight: '85vh',
    padding: '0',
    overflow: 'hidden',                // Content scrolls inside, modal stays still
  };

  const titleStyles: React.CSSProperties = {
    ...baseStyles,
    top: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto',
    maxWidth: '600px',
    padding: '1rem 2rem',
  };

  const containerStyle = isDialogue ? dialogueStyles : titleStyles;

  return (
    <div style={containerStyle}>
      <div style={{ 
        padding: isDialogue ? '2.5rem' : '0', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {isTitle && (questName || playerState) && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 0, 255, 0.3)',
            flexShrink: 0
          }}>
            {questName && <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff00ff' }}>Quest: {questName}</div>}
            {playerState && (
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
                {playerState.hp !== undefined && <span>HP: <strong style={{ color: '#ff00ff' }}>{playerState.hp}</strong></span>}
                {playerState.credits !== undefined && <span>Credits: <strong style={{ color: '#ff00ff' }}>{playerState.credits}</strong></span>}
              </div>
            )}
          </div>
        )}
        
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;