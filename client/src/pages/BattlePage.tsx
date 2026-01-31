import React from "react";
import Modal from "../components/ui/Modal";
import Monster from "../components/battle/Monster";
import { QuestionCard } from "../components/battle/QuestionCard";
import { useGame } from "../app/GameProvider";

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
        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: "2rem", padding: "2rem" }}>
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
    </div>
  );
};