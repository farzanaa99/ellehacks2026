import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Monster from "../components/battle/Monster";
import { QuestionCard } from "../components/battle/QuestionCard";
import { useGame } from "../app/GameProvider";
import battleBg from "../assets/images/main_wallpaper.png"; 

export default function BattlePage() {
  const { gameState, setGameState } = useGame();
  const navigate = useNavigate();
  const { currentQuest, currentFight, player } = gameState;
  
  const TOTAL_PHASES = 3;
  const MAX_WRONG_ANSWERS = 3; // 3 strikes and you're out
  
  // Local state for monster health
  const [monsterHp, setMonsterHp] = useState(100);
  
  // Track wrong answers for this quest
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const handleAnswer = (_selectedOptionIndex: number, correct: boolean) => {
    if (correct) {
      const isQuestComplete = currentFight >= TOTAL_PHASES - 1;

      if (isQuestComplete) {
        const alreadyDone = player.completedQuests?.includes(currentQuest);
        const updatedCompletedQuests = alreadyDone 
          ? player.completedQuests 
          : [...(player.completedQuests || []), currentQuest];

        const creditReward = alreadyDone ? 0 : 100;

        setGameState({
          ...gameState,
          currentFight: 0,
          player: {
            ...player,
            completedQuests: updatedCompletedQuests as any,
            credits: player.credits + creditReward,
          }
        });

        if (updatedCompletedQuests.length >= 4) {
          navigate('/end'); 
        } else {
          navigate('/bank'); 
        }
      } else {
        // Move to next question
        setMonsterHp(prev => Math.max(0, prev - 33.4));
        setGameState({
          ...gameState,
          currentFight: currentFight + 1
        });
      }
    } else {
      // Wrong answer - increment strike count
      const newWrongCount = wrongAnswers + 1;
      setWrongAnswers(newWrongCount);

      // Check if player has reached 3 strikes
      if (newWrongCount >= MAX_WRONG_ANSWERS) {
        // Reset quest progress
        setGameState({
          ...gameState,
          currentFight: 0,
        });
        navigate('/death');
      }
      // If not dead yet, just continue (no damage to player HP needed)
    }
  };

  // Calculate HP percentage based on strikes (visual feedback)
  const playerHpPercent = Math.max(0, 100 - (wrongAnswers * 33.4));

  return (
    <div style={{ 
      position: "fixed", inset: 0, 
      backgroundImage: `url(${battleBg})`, backgroundSize: "cover", backgroundPosition: "center",
      overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: '"Orbitron", sans-serif'
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10, 0, 20, 0.85)", zIndex: 0 }} />

      {/* TOP HUD */}
      <nav style={{ 
        zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.75rem 2rem", background: "rgba(20, 10, 30, 0.6)",
        backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(124, 58, 237, 0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#7c3aed", fontSize: "0.6rem", letterSpacing: "2px" }}>ACTIVE MISSION</span>
          <span style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "bold" }}>{currentQuest.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#a78bfa", fontSize: "0.6rem" }}>CREDITS</div>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>{player.credits}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#a78bfa", fontSize: "0.6rem" }}>SCORE</div>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>{player.creditScore}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#a78bfa", fontSize: "0.6rem" }}>STRIKES</div>
            <div style={{ color: wrongAnswers >= 2 ? "#ff4444" : "#fff", fontSize: "1.1rem", fontWeight: "bold" }}>
              {wrongAnswers} / {MAX_WRONG_ANSWERS}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#ff00ff", fontSize: "0.8rem", fontWeight: "bold" }}>PHASE {currentFight + 1} / {TOTAL_PHASES}</div>
          <div style={{ color: wrongAnswers >= 2 ? "#ff4444" : "#a78bfa", fontSize: "0.5rem", marginTop: "2px" }}>
             {wrongAnswers >= 2 ? "⚠ CRITICAL: 1 STRIKE REMAINING ⚠" : "SYSTEM: NOMINAL"}
          </div>
        </div>
      </nav>

      <div style={{ flex: 1, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: "6rem", marginTop: "-2rem" }}>
        <div style={{ width: 400 }}>
          <div style={{ color: '#7c3aed', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '1rem', fontWeight: 'bold' }}>▸ SELECT PROTOCOL</div>
          <QuestionCard
            key={`${currentQuest}-${currentFight}`} 
            questId={currentQuest}
            questionIndex={currentFight}
            onAnswer={handleAnswer}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "bossFloat 4s ease-in-out infinite" }}>
          <Monster width={450} height={450} />
          
          <div style={{ width: "250px", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid #ff00ff", marginTop: "1rem", padding: '2px', borderRadius: '4px' }}>
            <div style={{ 
              width: `${monsterHp}%`, height: "100%", backgroundColor: "#ff00ff", 
              boxShadow: "0 0 15px #ff00ff", transition: 'width 0.4s ease-out' 
            }} />
          </div>
          <div style={{ color: '#ff00ff', fontSize: '0.65rem', marginTop: '0.6rem', letterSpacing: '2px', fontWeight: 'bold' }}>
            TARGET INTEGRITY: {Math.round(monsterHp)}%
          </div>

          <div style={{ width: "150px", height: "3px", backgroundColor: "rgba(255,255,255,0.1)", marginTop: "1.5rem", borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${playerHpPercent}%`, 
              height: "100%", 
              backgroundColor: wrongAnswers >= 2 ? "#ff4444" : "#00ffcc", 
              transition: 'all 0.3s' 
            }} />
          </div>
          <div style={{ color: wrongAnswers >= 2 ? '#ff4444' : '#00ffcc', fontSize: '0.5rem', marginTop: '0.4rem', letterSpacing: '1px' }}>
            CORE INTEGRITY
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bossFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}