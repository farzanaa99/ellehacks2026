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
        width: 420,
        padding: '1rem',
        borderRadius: 12,
        background: 'rgba(10,6,18,0.98)',
        border: '1px solid rgba(124,58,237,0.4)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h4 style={{ margin: 0, color: '#a78bfa', fontFamily: '"Orbitron", sans-serif' }}>{term}</h4>
        <div style={{ color: '#fff', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>{definition}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}