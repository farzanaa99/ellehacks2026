import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import "../styles/dialogue.css";

import { getQuestsInOrder } from "../data/quests";
import type { QuestId } from "../game/types";

// helper if you don't already have one
function getQuestById(id: QuestId) {
  return getQuestsInOrder().find((q) => q.id === id);
}

export default function DialoguePage() {
  const { questId } = useParams(); // <-- comes from /dialogue/:questId
  const navigate = useNavigate();
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const quest = useMemo(() => {
    if (!questId) return null;
    return getQuestById(questId as QuestId) ?? null;
  }, [questId]);

  // If URL is wrong or quest not found
  if (!quest) {
    return <div style={{ padding: 24 }}>Dialogue: quest not found.</div>;
  }

  // ✅ Ideally this lives in your quest data.
  // For now, you can do a quick switch like this:
  const dialoguesToShow =
    quest.id === "quest1"
      ? [
          { text: "Welcome back, adventurer." },
          { text: "Complete quests to open an account." },
          { text: "Choose your reward wisely." },
        ]
      : quest.id === "quest2"
      ? [
          { text: "Credit can help... or hurt." },
          { text: "Let's see if you can handle a budget." },
        ]
      : [
          { text: `Starting: ${quest.name}` },
          { text: "Good luck." },
        ];

  const currentDialogue = dialoguesToShow[currentDialogueIndex];
  const isLast = currentDialogueIndex === dialoguesToShow.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentDialogueIndex((p) => p + 1);
    } else {
      // ✅ Done: go to battle for THIS quest
      navigate(`/battle/${quest.id}`);
    }
  };

  const handlePrev = () => {
    if (currentDialogueIndex > 0) setCurrentDialogueIndex((p) => p - 1);
  };

  return (
    <Modal
      type="dialogue"
      style={{ width: "min(92vw, 900px)", maxWidth: "900px" }}
    >
      <div className="dialogue-content">
        <p className="dialogue-text">{currentDialogue.text}</p>

        <div className="dialogue-nav">
          <Button onClick={handlePrev} disabled={currentDialogueIndex === 0}>
            ← Prev
          </Button>

          <span className="dialogue-counter">
            {currentDialogueIndex + 1} / {dialoguesToShow.length}
          </span>

          <Button onClick={handleNext}>{isLast ? "Done ✓" : "Next →"}</Button>
        </div>
      </div>
    </Modal>
  );
}
