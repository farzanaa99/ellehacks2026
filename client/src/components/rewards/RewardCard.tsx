import { Card } from '../ui/Card';
import { RewardChoice } from './RewardChoice';
import type { InventoryItem, QuestId } from '../../game/types';
import { getQuestRewards } from '../../data/rewards';

interface RewardCardProps {
  questId: QuestId;
  onClaim?: (item: InventoryItem) => void;
}

export const RewardCard = ({ questId, onClaim }: RewardCardProps) => {
  const rewards = getQuestRewards(questId);

  if (!rewards || rewards.length === 0) return <p>No rewards found.</p>;

  return (
    <Card style={{ maxWidth: '600px', margin: '1rem auto', padding: '1rem' }}>
      <p
        style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Choose your reward:
      </p>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {rewards.map((reward) => (
          <RewardChoice
            key={reward.id}
            item={reward}
            onSelect={onClaim || (() => {})}
          />
        ))}
      </div>
    </Card>
  );
};
