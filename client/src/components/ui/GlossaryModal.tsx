import React from 'react';
import Modal from './Modal';
import { Button } from './Button';

type Props = {
  open: boolean;
  term?: string;
  definition?: string;
  onClose: () => void;
};

export default function GlossaryModal({ open, term, definition, onClose }: Props) {
  if (!open) return null;
  return (
    <Modal
      type="dialogue"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 200,
        width: '400px', // Restored to original wider width
        height: '220px', // Reduced height for a sleek rectangle look
        padding: '1.5rem',
        borderRadius: 12,
        background: 'rgba(10,6,18,0.98)',
        border: '1px solid rgba(124,58,237,0.6)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        justifyContent: 'center',
        gap: '50px'
      }}>
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            color: '#a78bfa', 
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '2rem', // Increased font size
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {term}
          </h2>
          
          <div style={{ 
            color: '#fff', 
            fontSize: '1.5rem', // Increased font size
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            maxHeight: '80px', // Constrain text area
            overflowY: 'auto',   // Scroll if definition is long
            textAlign: 'center'
          }}>
            {definition}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}