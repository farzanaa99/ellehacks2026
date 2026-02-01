import { useState, useEffect } from 'react';
import { useGame } from '../app/GameProvider';
import { useNavigate } from 'react-router-dom';
import mainWallpaper from '../assets/images/main_wallpaper.png';
import { Button } from '../components/ui/Button';
import type { QuestId } from '../game/types';
import Modal from '../components/ui/Modal';
import '../styles/homebase.css';

/**
 * Logic to determine if rewards are pending based on quest completion
 */
const getBankTellerRewards = (gameState: any) => {
  const { player } = gameState;
  const { completedQuests } = player;
  
  if (completedQuests.includes('quest1') && !completedQuests.includes('quest2') && !player.inventory.includes('debit_sword') && !player.inventory.includes('credit_blade')) {
    return {
      showRewards: true,
      text: "Impressive work in the Seed Vault! As a token of our partnership, choose your first tool.",
      rewards: [
        { id: 'debit_sword', name: 'Debit Sword', description: 'Spend only what you have.', icon: '⚔️' },
        { id: 'credit_blade', name: 'Credit Blade', description: 'Borrow power from the future.', icon: '🗡️' },
      ],
    };
  }
  if (completedQuests.includes('quest2') && !completedQuests.includes('quest3') && !player.inventory.includes('budget_armor') && !player.inventory.includes('impulse_chainmail')) {
    return {
      showRewards: true,
      text: "You've survived the credit sector. You'll need better protection for what comes next.",
      rewards: [
        { id: 'budget_armor', name: "Planner's Armor", description: 'Protects from overspending.', icon: '🛡️' },
        { id: 'impulse_chainmail', name: 'Impulse Chainmail', description: 'Risky spending habits.', icon: '🥋' },
      ],
    };
  }
  return { showRewards: false, text: "", rewards: [] };
};

const getNextQuestId = (completedQuests: QuestId[]): QuestId => {
  if (!completedQuests.includes('quest1')) return 'quest1';
  if (!completedQuests.includes('quest2')) return 'quest2';
  if (!completedQuests.includes('quest3')) return 'quest3';
  return 'quest4';
};

export default function BasePage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const nextQuestId = getNextQuestId(gameState.player.completedQuests);
  const rewardInfo = getBankTellerRewards(gameState);

  // REDIRECT LOGIC: 
  // If there are no rewards to pick, the user shouldn't be here. 
  // Send them straight to the dialogue for the next part of the story.
  useEffect(() => {
    if (!rewardInfo.showRewards) {
      navigate(`/dialogue/${nextQuestId}`);
    }
  }, [rewardInfo.showRewards, nextQuestId, navigate]);

  const handleRewardSelect = (rewardId: string) => {
    setSelectedReward(rewardId);
    
    // Update Global State
    const updatedPlayer = { 
      ...gameState.player, 
      inventory: [...gameState.player.inventory, rewardId] as any 
    };
    setGameState({ ...gameState, player: updatedPlayer });

    // Transition to the Dialogue Page for the next quest after a brief delay
    setTimeout(() => navigate(`/dialogue/${nextQuestId}`), 1000);
  };

  // If redirecting, render nothing to prevent a flash of the UI
  if (!rewardInfo.showRewards) return null;

  return (
    <div style={{ 
      position: 'fixed', inset: 0, 
      backgroundImage: `url(${mainWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', zIndex: 1
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2 }} />

      <Modal
        type="dialogue"
        style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          height: '520px', width: '460px', zIndex: 100, padding: '1.5rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          border: '1px solid rgba(124, 58, 237, 0.5)', background: 'rgba(12, 8, 20, 0.98)',
          borderRadius: '20px', boxShadow: '0 0 60px rgba(0,0,0,1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* BANKER PORTRAIT */}
          <div className='speaker-container'>
            <div className='img-container'>  
              <img src={'src/assets/images/last_banker.png'} alt="Bank Teller" />
            </div>
            <h3 style={{ color: '#a78bfa', fontFamily: '"Orbitron", sans-serif', fontSize: '0.85rem', marginTop: '0.8rem', letterSpacing: '3px', fontWeight: 'bold' }}>
              BANK TELLER
            </h3>
          </div>

          {/* REWARD TEXT & SELECTION */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
            <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 15px' }}>
              <p style={{ color: '#fff', fontSize: '1.2rem', textAlign: 'center', margin: 0, lineHeight: '1.6', fontStyle: 'italic' }}>
                "{rewardInfo.text}"
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0 10px' }}>
              {rewardInfo.rewards.map((reward: any) => (
                <div 
                  key={reward.id} 
                  onClick={() => handleRewardSelect(reward.id)} 
                  style={{ 
                    padding: '0.8rem', borderRadius: 12, textAlign: 'center',
                    border: `1px solid ${selectedReward === reward.id ? '#ff00ff' : '#4c1d95'}`, 
                    background: selectedReward === reward.id ? 'rgba(255,0,255,0.15)' : 'rgba(0,0,0,0.4)', 
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                    transform: selectedReward === reward.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{reward.icon}</span>
                  <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>{reward.name}</span>
                  <span style={{ color: '#999', fontSize: '0.6rem', marginTop: '4px' }}>{reward.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ 
            marginTop: 'auto', padding: '1.2rem 0.5rem 0 0.5rem', 
            borderTop: '1px solid rgba(124, 58, 237, 0.2)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6d28d9', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Select a reward to proceed
            </p>
          </div>

        </div>
      </Modal>
    </div>
  );
}