import { useState } from "react";
import { Button } from "../components/ui/Button"; // <-- if Button is default export
// If your Button is a named export, use: import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import "../styles/dialogue.css";

export default function DialoguePage() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const navigate = useNavigate();

  const dialoguesToShow = [
    { text: "Welcome back, adventurer." },
    { text: "Complete quests to open an account." },
    { text: "Choose your reward wisely." },
  ];

  const currentDialogue = dialoguesToShow[currentDialogueIndex];

  const handleNext = () => {
  if (currentDialogueIndex < dialoguesToShow.length - 1) {
    setCurrentDialogueIndex((p) => p + 1);
  } else {
    // Finished dialogue → go somewhere else
    navigate("/map"); // change this to your target route
  }
};


  const handlePrev = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex((p) => p - 1);
    }
  };

  return (
    <Modal
      type="dialogue"
      style={{
        width: "min(92vw, 900px)", // tighter than 90% for a textbox feel
        maxWidth: "900px",
      }}
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

          <Button onClick={handleNext}>
            {currentDialogueIndex === dialoguesToShow.length - 1
                ? "Done ✓"
                : "Next →"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
