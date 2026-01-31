//map page, return to this page after every re-visit to the home base page before a quest starts
//visual nodes along a pathway that looks like a path graph with current active quest, next locked quest, and boss fight nodes remains ?? until unlocked

import { useGame } from '../app/GameProvider';
import { getQuestsInOrder } from '../data/quests';
import { startQuest } from '../game/engine';
import { useNavigate } from 'react-router-dom';
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

  const getNodeState = (questId: QuestId): NodeState => {
    if (gameState.player.completedQuests.includes(questId)) {
      return 'completed';
    }
    if (gameState.player.unlockedQuests.includes(questId)) {
      return 'active';
    }
    return 'locked';
  };

  const questNodes: QuestNode[] = allQuests.map(quest => ({
    questId: quest.id,
    name: quest.name,
    description: quest.description,
    state: getNodeState(quest.id),
    isBoss: quest.id === 'quest4'
  }));

  const handleNodeClick = (node: QuestNode) => {
    if (node.state === 'locked') {
      return; // Don't allow clicking locked nodes
    }

    // Start the quest
    const newState = startQuest(gameState, node.questId);
    setGameState(newState);

    // Navigate to battle page (or dialogue page if needed)
    navigate('/battle');
  };

  const getNodeStyle = (node: QuestNode) => {
    const baseStyle: React.CSSProperties = {
      position: 'relative',
      width: '140px',
      height: '140px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: node.state === 'locked' ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      border: '3px solid',
      fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
      textAlign: 'center',
      backdropFilter: 'blur(4px)',
      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
      padding: '1rem',
    };

    if (node.isBoss) {
      // Boss node styling
      if (node.state === 'completed') {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(0, 150, 0, 0.7)',
          borderColor: '#00ff00',
          color: '#ffffff',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
        };
      } else if (node.state === 'active') {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(150, 0, 0, 0.7)',
          borderColor: '#ff0000',
          color: '#ffffff',
          boxShadow: '0 0 30px rgba(255, 0, 0, 0.7)',
          animation: 'pulse 2s infinite',
        };
      } else {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(50, 50, 50, 0.7)',
          borderColor: '#666666',
          color: '#888888',
          opacity: 0.5,
        };
      }
    } else {
      // Regular quest node styling
      if (node.state === 'completed') {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(0, 100, 200, 0.7)',
          borderColor: '#00aaff',
          color: '#ffffff',
          boxShadow: '0 0 15px rgba(0, 170, 255, 0.4)',
        };
      } else if (node.state === 'active') {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 0, 255, 0.7)',
          borderColor: '#ff00ff',
          color: '#ffffff',
          boxShadow: '0 0 25px rgba(255, 0, 255, 0.6)',
        };
      } else {
        return {
          ...baseStyle,
          backgroundColor: 'rgba(50, 50, 50, 0.7)',
          borderColor: '#666666',
          color: '#888888',
          opacity: 0.5,
        };
      }
    }
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.7);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 0, 0, 1);
          }
        }
        
        .node-container:hover .node-tooltip {
          opacity: 1 !important;
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${mainWallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
        />

        {/* Map Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            padding: '2rem',
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
              fontSize: '2.5rem',
              marginBottom: '3rem',
              textShadow: '0 0 20px rgba(255, 0, 255, 0.8)',
            }}
          >
            Quest Map
          </h1>

          {/* Path Graph */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexWrap: 'wrap',
            }}
          >
            {questNodes.map((node, index) => (
              <div
                key={node.questId}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Quest Node */}
                <div
                  className="node-container"
                  style={{
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (node.state !== 'locked') {
                      const tooltip = e.currentTarget.querySelector('.node-tooltip') as HTMLElement;
                      if (tooltip) {
                        tooltip.style.opacity = '1';
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (node.state !== 'locked') {
                      const tooltip = e.currentTarget.querySelector('.node-tooltip') as HTMLElement;
                      if (tooltip) {
                        tooltip.style.opacity = '0';
                      }
                    }
                  }}
                >
                  <div
                    onClick={() => handleNodeClick(node)}
                    style={getNodeStyle(node)}
                    onMouseEnter={(e) => {
                      if (node.state !== 'locked') {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.filter = 'brightness(1.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (node.state !== 'locked') {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'brightness(1)';
                      }
                    }}
                  >
                    {node.isBoss && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-15px',
                          right: '-5px',
                          fontSize: '1.5rem',
                          zIndex: 10,
                        }}
                      >
                        👹
                      </div>
                    )}
                    {node.state === 'completed' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '-5px',
                          fontSize: '1.5rem',
                          zIndex: 10,
                        }}
                      >
                        ✓
                      </div>
                    )}
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', lineHeight: '1.2' }}>
                      {node.name}
                    </div>
                    {node.state === 'locked' && (
                      <div
                        style={{
                          marginTop: '0.3rem',
                          fontSize: '0.7rem',
                          fontStyle: 'italic',
                        }}
                      >
                        🔒
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Tooltip with Description - Only show for unlocked nodes */}
                  {node.state !== 'locked' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '1rem',
                        padding: '0.8rem 1rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        border: '2px solid #ff00ff',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        width: '300px',
                        maxWidth: '300px',
                        minWidth: '300px',
                        textAlign: 'center',
                        fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
                        zIndex: 1000,
                        opacity: 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s ease',
                        whiteSpace: 'normal',
                        lineHeight: '1.4',
                      }}
                      className="node-tooltip"
                    >
                      {node.description}
                      {node.state === 'active' && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#ff00ff' }}>
                          Click Pink Node to Start
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Connection Line (except for last node) */}
                {index < questNodes.length - 1 && (
                  <div
                    style={{
                      width: '80px',
                      height: '4px',
                      backgroundColor: node.state === 'locked' ? '#666666' : '#ff00ff',
                      margin: '0 10px',
                      zIndex: 1,
                      boxShadow: node.state === 'locked' ? 'none' : '0 0 10px rgba(255, 0, 255, 0.5)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Back to Home Base Button */}
          <button
            onClick={() => navigate('/bank')}
            style={{
              marginTop: '3rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              color: '#ffffff',
              backgroundColor: 'rgba(20, 0, 20, 0.8)',
              border: '2px solid #ff00ff',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 0, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 0, 30, 0.9)';
              e.currentTarget.style.borderColor = '#ff66ff';
              e.currentTarget.style.boxShadow = '0 0 30px #ff00ff, 0 0 40px #ff00ff';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(20, 0, 20, 0.8)';
              e.currentTarget.style.borderColor = '#ff00ff';
              e.currentTarget.style.boxShadow = '0 0 20px #ff00ff, inset 0 0 20px rgba(255, 0, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Back to Bank Teller
          </button>
        </div>
      </div>
    </>
  );
}