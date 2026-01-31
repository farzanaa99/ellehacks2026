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
  const dialoguesToShow = dialogues.length ? dialogues : [
    { id: 'default', speaker: 'Bank Teller', text: "Welcome! Complete quests to open an account.", sceneType: 'general' }
  ];

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
    setTimeout(() => navigate('/map'), 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${mainWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />

      <Modal type="dialogue">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* 1. HEADER */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ width: 140, height: 140, margin: '0 auto', borderRadius: 20, border: '4px solid #7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px #7c3aed', backgroundColor: 'rgba(90,24,154,0.25)', overflow: 'hidden' }}>
              <img src={'src/assets/images/bankTellerImage.png'} alt="Bank Teller" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ color: '#a78bfa', fontFamily: '"Orbitron", monospace', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '0.75rem' }}>
              Bank Teller
            </div>
          </div>

          {/* 2. MIDDLE (Centered Text & Rewards) */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', overflowY: 'auto' }}>
            <p style={{ color: '#fff', fontSize: '1.3rem', fontFamily: '"Orbitron", monospace', lineHeight: '1.8', margin: '0 auto', maxWidth: '850px' }}>
              "{currentDialogue?.text}"
            </p>

            {rewardInfo.showRewards && isLastDialogue && (
              <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '0 2rem' }}>
                {rewardInfo.rewards.map((reward: any) => (
                  <div key={reward.id} onClick={() => handleRewardSelect(reward.id)} style={{ padding: '1.5rem', borderRadius: 12, border: '2px solid #7c3aed', background: selectedReward === reward.id ? 'rgba(124,58,237,0.35)' : 'rgba(0,0,0,0.6)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    <div style={{ fontSize: '2.5rem' }}>{reward.icon}</div>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontFamily: '"Orbitron", monospace' }}>{reward.name}</div>
                    <div style={{ color: '#ccc', fontSize: '0.85rem' }}>{reward.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. FOOTER (Stable Navigation) */}
          <div style={{ flexShrink: 0, width: '100%', maxWidth: '650px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '60px' }}>
              
              <div style={{ opacity: currentDialogueIndex === 0 ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                <Button onClick={handlePrev} disabled={currentDialogueIndex === 0}>← Prev</Button>
              </div>

              <div style={{ textAlign: 'center', flexGrow: 1 }}>
                {isLastDialogue ? (
                   <Button small onClick={() => navigate('/map')}>Start Quest</Button>
                ) : (
                  <span style={{ color: '#a78bfa', fontFamily: '"Orbitron", monospace', fontSize: '0.9rem', letterSpacing: '2px' }}>
                    {currentDialogueIndex + 1} / {dialoguesToShow.length}
                  </span>
                )}
              </div>

              <div style={{ opacity: isLastDialogue ? 0.3 : 1, transition: 'opacity 0.2s' }}>
                <Button onClick={handleNext} disabled={isLastDialogue}>Next →</Button>
              </div>

            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}