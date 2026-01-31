// components/ui/RewardCard.tsx
import React from 'react';
import { Card } from '../ui/Card';
import type { InventoryItem, QuestId } from '../../game/types';
import { QUEST_REWARDS, getQuestReward } from '../../data/rewards';

interface RewardCardProps {
  questId: QuestId;
  bankChoice?: 'good' | 'bad' | null; // optional, for quest1
  onClaim?: (item: InventoryItem) => void;
}

export const RewardCard = ({ questId, bankChoice = null, onClaim }: RewardCardProps) => {
  const reward = getQuestReward(questId, bankChoice);

  if (!reward) return <p>No reward found.</p>;

  const handleClaim = () => {
    onClaim?.(reward);
  };

  return (
    <Card style={{ maxWidth: '500px', margin: '1rem auto' }}>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {reward.name} ({reward.type.toUpperCase()})
      </p>
      <p style={{ marginBottom: '1rem', fontSize: '1rem', color: '#ddd' }}>
        {reward.description}
      </p>
      <button
        onClick={handleClaim}
        style={{
          padding: '0.6rem 1.5rem',
          fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: 'rgba(30, 0, 30, 0.8)',
          border: '2px solid #ff00ff',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 0 12px #ff00ff, inset 0 0 8px rgba(255, 0, 255, 0.2)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(40, 0, 40, 0.9)';
          e.currentTarget.style.borderColor = '#ff66ff';
          e.currentTarget.style.boxShadow =
            '0 0 20px #ff00ff, 0 0 30px #ff00ff, inset 0 0 10px rgba(255, 0, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(30, 0, 30, 0.8)';
          e.currentTarget.style.borderColor = '#ff00ff';
          e.currentTarget.style.boxShadow =
            '0 0 12px #ff00ff, inset 0 0 8px rgba(255, 0, 255, 0.2)';
        }}
      >
        Claim Reward
      </button>
    </Card>
  );
};
