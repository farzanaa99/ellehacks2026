import type { InventoryItem } from '../../game/types';

interface RewardChoiceProps {
  item: InventoryItem;
  onSelect: (item: InventoryItem) => void;
}

export const RewardChoice = ({ item, onSelect }: RewardChoiceProps) => {
  return (
    <div
      style={{
        flex: '1 1 45%', // horizontal layout, two cards per row
        padding: '0.8rem 1rem',
        border: '2px solid #ff00ff',
        borderRadius: '8px',
        backgroundColor: 'rgba(30,0,30,0.8)',
        color: '#fff',
        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: '0 0 12px #ff00ff, inset 0 0 8px rgba(255,0,255,0.2)',
        transition: 'all 0.2s ease',
      }}
      onClick={() => onSelect(item)}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(40,0,40,0.9)';
        e.currentTarget.style.boxShadow = '0 0 20px #ff00ff, inset 0 0 10px rgba(255,0,255,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(30,0,30,0.8)';
        e.currentTarget.style.boxShadow = '0 0 12px #ff00ff, inset 0 0 8px rgba(255,0,255,0.2)';
      }}
    >
      <p style={{ marginBottom: '0.5rem' }}>{item.name}</p>
      <p style={{ fontSize: '0.9rem', color: '#ddd' }}>{item.type.toUpperCase()}</p>
      <p style={{ fontSize: '0.85rem', color: '#bbb', marginTop: '0.5rem' }}>{item.description}</p>
    </div>
  );
};
