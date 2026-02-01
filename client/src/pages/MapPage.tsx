import React from 'react';
import { useGame } from '../app/GameProvider';
import { getQuestsInOrder } from '../data/quests';
import { startQuest } from '../game/engine';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import type { QuestId } from '../game/types';
import mainWallpaper from '../assets/images/main_wallpaper.png';

type NodeState = 'completed' | 'active' | 'locked';

interface QuestNode {
  questId: QuestId;
  name: string;
  description: string;
  state: NodeState;
  isBoss: boolean;
}

export default function MapPage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  
  const allQuests = getQuestsInOrder();
  const completedList = gameState.player.completedQuests || [];

  const getNodeState = (questId: QuestId, index: number): NodeState => {
    if (completedList.includes(questId)) return 'completed';
    if (index === 0) return 'active';
    
    const prevQuest = allQuests[index - 1];
    if (prevQuest && completedList.includes(prevQuest.id)) return 'active';

    return 'locked';
  };

  const questNodes: QuestNode[] = allQuests.map((quest, index) => ({
    questId: quest.id,
    name: quest.name,
    description: quest.description,
    state: getNodeState(quest.id, index),
    isBoss: index === allQuests.length - 1 
  }));

  const handleNodeClick = (node: QuestNode) => {
    if (node.state === 'locked') return;

    // 1. Prepare the engine state for the specific quest
    const newState = startQuest(gameState, node.questId);
    
    // 2. Update Global State
    // REMOVED monsterHp: 100 from here because it's handled locally in BattlePage
    setGameState({
      ...newState,
      currentQuest: node.questId,
      currentFight: 0 
    });
    
    navigate(`/battle/${node.questId}`);
  };

  const getNodeStyle = (node: QuestNode) => {
    const baseStyle: React.CSSProperties = {
      position: 'relative', width: '130px', height: '130px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      cursor: node.state === 'locked' ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease', border: '3px solid',
      fontFamily: '"Orbitron", sans-serif', textAlign: 'center',
      backdropFilter: 'blur(4px)',
      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
      padding: '10px', zIndex: 2
    };

    if (node.state === 'completed') {
      return { ...baseStyle, backgroundColor: 'rgba(0, 100, 255, 0.4)', borderColor: '#00ccff', color: '#fff' };
    } else if (node.state === 'active') {
      return { ...baseStyle, backgroundColor: 'rgba(255, 0, 255, 0.3)', borderColor: '#ff00ff', color: '#fff', transform: 'scale(1.05)' };
    } else {
      return { ...baseStyle, backgroundColor: 'rgba(20, 20, 20, 0.8)', borderColor: '#444', color: '#666' };
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundImage: `url(${mainWallpaper})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }} />

      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontFamily: '"Orbitron"', fontSize: '3rem', marginBottom: '4rem', textShadow: '0 0 15px #ff00ff' }}>
          QUEST NETWORK
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap', justifyContent: 'center' }}>
          {questNodes.map((node, index) => (
            <React.Fragment key={node.questId}>
              <div style={{ position: 'relative' }}>
                <div onClick={() => handleNodeClick(node)} style={getNodeStyle(node)}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>{node.name}</div>
                  {node.state === 'locked' ? (
                     <div style={{ fontSize: '1.2rem' }}>🔒</div>
                  ) : node.state === 'completed' ? (
                     <div style={{ color: '#00ffcc', fontWeight: 'bold' }}>✓</div>
                  ) : (
                     <div style={{ fontSize: '0.6rem', color: '#ff00ff', letterSpacing: '1px' }}>READY</div>
                  )}
                </div>
              </div>

              {index < questNodes.length - 1 && (
                <div style={{
                  width: '60px', height: '2px',
                  backgroundColor: node.state === 'completed' ? '#ff00ff' : '#444',
                  boxShadow: node.state === 'completed' ? '0 0 10px #ff00ff' : 'none'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: '5rem' }}>
          <Button onClick={() => navigate('/bank')}>
            RETURN TO BASE
          </Button>
        </div>
      </div>
    </div>
  );
}