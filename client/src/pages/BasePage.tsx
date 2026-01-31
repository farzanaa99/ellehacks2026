import { useState, useEffect } from 'react';
import { useGame } from '../app/GameProvider';
import { useNavigate } from 'react-router-dom';
import mainWallpaper from '../assets/images/main_wallpaper.png';
import { Button } from '../components/ui/Button';
import { getHomeBaseDialogue } from '../data/dialogue';
import type { QuestId } from '../game/types';

const getBankTellerRewards = (gameState: any) => {
  const { player } = gameState;
  const { completedQuests } = player;

  // After Quest 1
  if (completedQuests.includes('quest1') && !completedQuests.includes('quest2')) {
    return {
      showRewards: true,
      rewards: [
        {
          id: 'debit_sword',
          name: 'Debit Sword',
          description: 'Spend only what you have. Safe and reliable.',
          icon: '⚔️',
        },
        {
          id: 'credit_blade',
          name: 'Credit Blade',
          description: 'Borrow power from the future. Use wisely.',
          icon: '🗡️',
        },
      ],
    };
  }

  // After Quest 2
  if (completedQuests.includes('quest2') && !completedQuests.includes('quest3')) {
    return {
      showRewards: true,
      rewards: [
        {
          id: 'budget_armor',
          name: "Planner's Plate Armor",
          description: 'Protects you from overspending.',
          icon: '🛡️',
        },
        {
          id: 'impulse_chainmail',
          name: 'Impulse Chainmail',
          description: 'Risky spending habits.',
          icon: '🥋',
        },
      ],
    };
  }

  // After final quest
  if (completedQuests.includes('quest4')) {
    if (player.credits >= 500) {
      return {
        showRewards: true,
        rewards: [
          {
            id: 'good_bank',
            name: 'Good Bank Account',
            description: 'No fees. +50 credits.',
            icon: '🏦',
          },
          {
            id: 'bad_bank',
            name: 'Bad Bank Account',
            description: 'High fees.',
            icon: '💸',
          },
        ],
      };
    }
  }

  return { showRewards: false, rewards: [] };
};

// Determine next quest based on completed quests
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

  // Get next quest and corresponding dialogue
  const nextQuestId = getNextQuestId(gameState.player.completedQuests);
  const dialogues = getHomeBaseDialogue(nextQuestId);

  // Fallback to a default dialogue if none exist so navigation buttons still appear
  const dialoguesToShow =
    dialogues.length > 0
      ? dialogues
      : [
          {
            id: 'default',
            speaker: 'Bank Teller',
            text: "Welcome to Celestial Corp! I'm here to help you on your financial journey. Complete quests to open an account.",
            sceneType: 'general',
          },
        ];

  // Reset dialogue index whenever the next quest changes
  useEffect(() => {
    setCurrentDialogueIndex(0);
  }, [nextQuestId]);

  const currentDialogue = dialoguesToShow[currentDialogueIndex];
  
  const rewardInfo = getBankTellerRewards(gameState);

  const handleNext = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(prev => prev - 1);
    }
  };

  const handleRewardSelect = (rewardId: string) => {
    setSelectedReward(rewardId);

    let updatedPlayer = {
      ...gameState.player,
      inventory: [...gameState.player.inventory, rewardId] as any,
    };

    if (rewardId === 'good_bank') {
      updatedPlayer = {
        ...updatedPlayer,
        credits: updatedPlayer.credits + 50,
      };
    }

    if (rewardId === 'bad_bank') {
      updatedPlayer = {
        ...updatedPlayer,
        credits: updatedPlayer.credits - 20,
      };
    }

    setGameState({
      ...gameState,
      player: updatedPlayer,
    });

    setTimeout(() => navigate('/map'), 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url(${mainWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />

      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '2rem 1.5rem',
          gap: '1.25rem',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '100%', flex: 1, overflowY: 'auto', paddingBottom: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>

        {/* Robot Banker */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 200,
              height: 200,
              border: '4px solid #7c3aed',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 100,
              boxShadow: '0 0 30px #7c3aed',
              backgroundColor: 'rgba(90, 24, 154, 0.25)',
            }}
          >
            🤖
          </div>
          <div 
            style={{ 
              color: '#a78bfa', 
              marginTop: '1rem',
              fontFamily: '"Orbitron", monospace',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px #7c3aed'
            }}
          >
            Bank Teller
          </div>
        </div>

        {/* Dialogue Box Below */}
        <div style={{ maxWidth: 800, width: '100%' }}>
          <div
            style={{
              background: 'rgba(0,0,0,0.85)',
              border: '3px solid #7c3aed',
              borderRadius: 16,
              padding: '1.5rem',
              boxShadow: '0 0 25px #7c3aed',
              minHeight: '120px',
              maxWidth: 'min(90vw, 800px)',
              width: '100%',
              maxHeight: 'calc(100vh - 240px)',
              overflowY: 'auto',
            }}
          >
            <p 
              style={{ 
                color: '#fff', 
                fontSize: '1.2rem',
                fontFamily: '"Orbitron", monospace',
                lineHeight: '1.8'
              }}
            >
              {currentDialogue?.text || 'Welcome back, adventurer.'}
            </p>

            {/* Navigation buttons for dialogue */}
            {dialoguesToShow.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button 
                  onClick={handlePrev}
                  disabled={currentDialogueIndex === 0}
                  style={{
                    opacity: currentDialogueIndex === 0 ? 0.5 : 1,
                    cursor: currentDialogueIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Prev
                </Button>
                
                <span style={{ color: '#a78bfa', fontFamily: '"Orbitron", monospace' }}>
                  {currentDialogueIndex + 1} / {dialoguesToShow.length}
                </span>

                <Button 
                  onClick={handleNext}
                  disabled={currentDialogueIndex === dialoguesToShow.length - 1}
                  style={{
                    opacity: currentDialogueIndex === dialoguesToShow.length - 1 ? 0.5 : 1,
                    cursor: currentDialogueIndex === dialoguesToShow.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next →
                </Button>
              </div>
            )}
          </div>

          {/* Rewards Section */}
          {rewardInfo.showRewards && currentDialogueIndex === dialoguesToShow.length - 1 && (
            <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
              <h3 
                style={{ 
                  color: '#a78bfa', 
                  textAlign: 'center',
                  fontFamily: '"Orbitron", monospace',
                  fontSize: '1.3rem',
                  textShadow: '0 0 10px #7c3aed'
                }}
              >
                Select Your Reward
              </h3>
              {rewardInfo.rewards.map((reward: any) => (
                <div
                  key={reward.id}
                  onClick={() => handleRewardSelect(reward.id)}
                  style={{
                    padding: '1.5rem',
                    borderRadius: 14,
                    border: '2px solid #7c3aed',
                    background:
                      selectedReward === reward.id
                        ? 'rgba(124,58,237,0.35)'
                        : 'rgba(0,0,0,0.6)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedReward !== reward.id) {
                      e.currentTarget.style.background = 'rgba(124,58,237,0.2)';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedReward !== reward.id) {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '3rem' }}>{reward.icon}</div>
                  <div 
                    style={{ 
                      color: '#fff', 
                      fontWeight: 'bold',
                      fontFamily: '"Orbitron", monospace',
                      fontSize: '1.1rem',
                      marginTop: '0.5rem'
                    }}
                  >
                    {reward.name}
                  </div>
                  <div 
                    style={{ 
                      color: '#ccc',
                      fontFamily: '"Orbitron", monospace',
                      fontSize: '0.9rem',
                      marginTop: '0.5rem'
                    }}
                  >
                    {reward.description}
                  </div>
                  {selectedReward === reward.id && (
                    <div 
                      style={{ 
                        color: '#00ff00', 
                        marginTop: '0.5rem',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}
                    >
                      ✓ Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
        </div> {/* end scrollable area */}

        {/* Fixed bottom action footer */}
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 12, display: 'flex', justifyContent: 'center', zIndex: 1003, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto', background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.35))', padding: '0.5rem 1rem', borderRadius: 12 }}>
            <Button small onClick={() => navigate('/home')}>
              Back to Home
            </Button>
            {currentDialogueIndex === dialoguesToShow.length - 1 && (
              <Button small onClick={() => navigate('/map')}>
                Start Quest
              </Button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}