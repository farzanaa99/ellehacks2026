import { useState, useEffect } from 'react';
import { useGame } from '../app/GameProvider';
import { useNavigate } from 'react-router-dom';
import mainWallpaper from '../assets/images/main_wallpaper.png';
import { Button } from '../components/ui/Button';
import { getHomeBaseDialogue } from '../data/dialogue';
import type { QuestId } from '../game/types';
import Modal from '../components/ui/Modal';

const getBankTellerRewards = (gameState: any) => {
  const { player } = gameState;
  const { completedQuests } = player;

  if (completedQuests.includes('quest1') && !completedQuests.includes('quest2')) {
    return {
      showRewards: true,
      rewards: [
        { id: 'debit_sword', name: 'Debit Sword', description: 'Spend only what you have.', icon: '⚔️' },
        { id: 'credit_blade', name: 'Credit Blade', description: 'Borrow power from the future.', icon: '🗡️' },
      ],
    };
  }
  if (completedQuests.includes('quest2') && !completedQuests.includes('quest3')) {
    return {
      showRewards: true,
      rewards: [
        { id: 'budget_armor', name: "Planner's Armor", description: 'Protects from overspending.', icon: '🛡️' },
        { id: 'impulse_chainmail', name: 'Impulse Chainmail', description: 'Risky spending habits.', icon: '🥋' },
      ],
    };
  }
  return { showRewards: false, rewards: [] };
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
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const nextQuestId = getNextQuestId(gameState.player.completedQuests);
  const dialogues = getHomeBaseDialogue(nextQuestId);
  
  const dialoguesToShow = dialogues.length
    ? dialogues
    : [{ id: 'default', speaker: 'Bank Teller', text: "Welcome!", sceneType: 'general' }];

  useEffect(() => { setCurrentDialogueIndex(0); }, [nextQuestId]);

  const currentDialogue = dialoguesToShow[currentDialogueIndex];
  const rewardInfo = getBankTellerRewards(gameState);
  const isLastDialogue = currentDialogueIndex === dialoguesToShow.length - 1;

  const handleNext = () => currentDialogueIndex < dialoguesToShow.length - 1 && setCurrentDialogueIndex(prev => prev + 1);
  const handlePrev = () => currentDialogueIndex > 0 && setCurrentDialogueIndex(prev => prev - 1);

  const handleRewardSelect = (rewardId: string) => {
    setSelectedReward(rewardId);
    let updatedPlayer = { ...gameState.player, inventory: [...gameState.player.inventory, rewardId] as any };
    setGameState({ ...gameState, player: updatedPlayer });
    setTimeout(() => navigate('/map'), 1000);
  };

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
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', 
          height: '520px',      // Increased height to accommodate larger header
          width: '460px',       // Slightly wider for better proportions
          margin: 0,
          zIndex: 100,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(124, 58, 237, 0.5)',
          background: 'rgba(12, 8, 20, 0.98)',
          borderRadius: '20px',
          boxShadow: '0 0 60px rgba(0,0,0,1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* HEADER - LARGER CENTERED AVATAR */}
          <div style={{ textAlign: 'center', height: '170px', paddingTop: '10px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              margin: '0 auto', 
              borderRadius: '50%', 
              border: '3px solid #7c3aed', 
              overflow: 'hidden',
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: '#000', 
              boxShadow: '0 0 25px rgba(124, 58, 237, 0.4)'
            }}>
              <img 
                src={'src/assets/images/last_banker.png'} 
                alt="Bank Teller" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',   
                  objectPosition: 'center' 
                }} 
              />
            </div>
            <div style={{ 
              color: '#a78bfa', 
              fontFamily: '"Orbitron", sans-serif', 
              fontSize: '0.85rem', 
              marginTop: '0.8rem', 
              letterSpacing: '3px', 
              fontWeight: 'bold' 
            }}>
              BANK TELLER
            </div>
          </div>

          {/* MIDDLE AREA */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
            
            <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 15px' }}>
              <p style={{ 
                color: '#fff', 
                fontSize: '1.1rem', 
                textAlign: 'center', 
                margin: 0, 
                lineHeight: '1.6', 
                fontWeight: 500, 
                fontStyle: 'italic',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                "{currentDialogue?.text}"
              </p>
            </div>

            <div style={{ minHeight: '100px' }}>
              {rewardInfo.showRewards && isLastDialogue && (
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
                        boxShadow: selectedReward === reward.id ? '0 0 20px rgba(255,0,255,0.3)' : 'none',
                        transform: selectedReward === reward.id ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{reward.icon}</span>
                      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>{reward.name}</span>
                      <span style={{ color: '#999', fontSize: '0.6rem', marginTop: '4px' }}>{reward.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ 
            marginTop: 'auto',
            padding: '1.2rem 0.5rem 0 0.5rem', 
            borderTop: '1px solid rgba(124, 58, 237, 0.2)',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Button onClick={currentDialogueIndex === 0 ? () => navigate('/intro') : handlePrev}>
              {currentDialogueIndex === 0 ? '←' : 'Prev'}
            </Button>

            <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontFamily: '"Orbitron", sans-serif', letterSpacing: '2px' }}>
              {currentDialogueIndex + 1} / {dialoguesToShow.length}
            </span>

            <div style={{ width: '90px', display: 'flex', justifyContent: 'flex-end' }}>
              {isLastDialogue && !rewardInfo.showRewards ? (
                <Button onClick={() => navigate('/map')}>Start</Button>
              ) : (
                <Button onClick={handleNext} disabled={isLastDialogue}>Next</Button>
              )}
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}