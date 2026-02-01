import { useState, useEffect } from 'react';
import { useGame } from '../app/GameProvider';
import { useNavigate } from 'react-router-dom';
import mainWallpaper from '../assets/images/main_wallpaper.png';
import { Modal } from '../components/ui/Modal'; // Assuming named export, adjust if default
import type { QuestId } from '../game/types';

const getBankTellerRewards = (gameState: any) => {
  const { player } = gameState;
  // Reward for Quest 1
  if (player.completedQuests.includes('quest1') && !player.inventory.some((i: { id: string; }) => i.id === 'debit_sword' || i.id === 'credit_blade')) {
    return {
      showRewards: true,
      text: "Impressive work in the Seed Vault! Choose your first tool.",
      rewards: [
        { id: 'debit_sword', name: 'Debit Sword', type: 'weapon', description: 'Spend only what you have.', icon: '⚔️' },
        { id: 'credit_blade', name: 'Credit Blade', type: 'weapon', description: 'Borrow power from the future.', icon: '🗡️' },
      ],
    };
  }
  return { showRewards: false, text: "", rewards: [] };
};

export default function BasePage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const { player } = gameState;
  const rewardInfo = getBankTellerRewards(gameState);

  useEffect(() => {
    // 1. If Intro hasn't been seen, go to intro dialogue
    if (!player.hasSeenIntro) {
      navigate('/dialogue/intro');
      return;
    }

    // 2. If no rewards are pending, go to the current quest's dialogue
    if (!rewardInfo.showRewards) {
      navigate(`/dialogue/${gameState.currentQuest}`);
    }
  }, [player.hasSeenIntro, rewardInfo.showRewards, gameState.currentQuest, navigate]);

  const handleRewardSelect = (reward: any) => {
    setSelectedReward(reward.id);
    
    const updatedPlayer = { 
      ...player, 
      inventory: [...player.inventory, reward] 
    };
    
    setGameState({ ...gameState, player: updatedPlayer });
    
    // Move to next story beat
    setTimeout(() => navigate(`/dialogue/${gameState.currentQuest}`), 1000);
  };

  if (!rewardInfo.showRewards) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${mainWallpaper})`, backgroundSize: 'cover' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
      <Modal type="dialogue" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '460px', background: 'rgba(12, 8, 20, 0.98)', border: '1px solid #7c3aed', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={'src/assets/images/last_banker.png'} alt="Banker" style={{ width: '80px', marginBottom: '10px' }} />
          <h3 style={{ color: '#a78bfa', letterSpacing: '2px' }}>BANK TELLER</h3>
          <p style={{ color: '#fff', textAlign: 'center', fontStyle: 'italic' }}>"{rewardInfo.text}"</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '20px', width: '100%' }}>
            {rewardInfo.rewards.map((reward) => (
              <div 
                key={reward.id} 
                onClick={() => handleRewardSelect(reward)}
                style={{ 
                  padding: '1rem', border: `1px solid ${selectedReward === reward.id ? '#ff00ff' : '#4c1d95'}`, 
                  cursor: 'pointer', textAlign: 'center', background: 'rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ fontSize: '1.5rem' }}>{reward.icon}</div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>{reward.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}