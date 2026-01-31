import Modal from "../components/ui/Modal";
import Monster from "../components/battle/Monster";
import { QuestionCard } from "../components/battle/QuestionCard";
import { useGame } from "../app/GameProvider";
import ClarityPuzzle from "../components/hud/ClarityPuzzle";
import StatsBar from "../components/hud/StatsBar";

export default function BattlePage() {
  const { gameState } = useGame();
  const { currentQuest, currentFight, player } = gameState;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Modal
        type="title"
        questName={currentQuest}
        playerState={{
          hp: player.hp,
          credits: player.credits,
          clarity: player.clarity,
          creditScore: player.creditScore,
        }}
      >
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Encounter</div>
        <div>Fight {currentFight + 1}</div>
      </Modal>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: "2rem", padding: "2rem", position: 'relative' }}>
          {/* Left: Question Card */}
          <div style={{ width: 360, flexShrink: 0 }}>
            <QuestionCard
              questId={currentQuest}
              questionIndex={currentFight}
              onAnswer={(selectedOption, correct) => {
                console.log("answered", selectedOption, correct);
              }}
            />
          </div>

          {/* Center: Enlarged Monster */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Monster width={520} height={520} />
          </div>

          {/* Right: spacer for symmetry (optional) */}
          <div style={{ width: 200, flexShrink: 0 }} />
        </div>
      </div>

      {/* Top-right HUD: Clarity puzzle and StatsBar (credits) */}
      <div style={{ position: 'fixed', top: 16, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, zIndex: 1100 }}>
        <ClarityPuzzle />
        <StatsBar label="Credits" value={player.credits} max={Math.max(player.credits, 100)} width="180px" />
      </div>
    </div>
  );
};