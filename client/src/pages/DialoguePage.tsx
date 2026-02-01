import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import HighlightableText from "../components/ui/HiglightableText";
import GlossaryModal from "../components/ui/GlossaryModal";
import { GLOSSARY } from "../data/glossary";
import { DIALOGUE, formatDialogueText } from "../data/dialogue";
import { useGame } from "../app/GameProvider";

// Assets
import introWallpaper from "../assets/images/battle_bg.webp";
import baseWallpaper from "../assets/images/main_wallpaper.png";
import elliPortrait from "../assets/images/MC.png";
import bankerPortrait from "../assets/images/last_banker.png";

import type { QuestId } from "../game/types";
import "../styles/dialogue.css";

export default function DialoguePage() {
  const { questId = "intro" } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { gameState, setGameState } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Glossary state
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryItem, setGlossaryItem] = useState<{
    term: string;
    definition: string;
  } | null>(null);

  /**
   * Reset dialogue index whenever route changes
   */
  useEffect(() => {
    setCurrentIndex(0);
  }, [questId]);

  /**
   * Dialogue selection
   * URL is the single source of truth
   */
  const dialogues = useMemo(() => {
    if (questId === "intro") {
      return DIALOGUE.introScene;
    }

    if (!gameState.player.hasSeenIntro) {
      return DIALOGUE.introScene;
    }

    return DIALOGUE.homeBase[questId as QuestId] ?? [];
  }, [questId, gameState.player.hasSeenIntro]);

  const currentLine = dialogues[currentIndex];
  const isLastLine = currentIndex === dialogues.length - 1;

  /**
   * Dynamic visuals
   */
  const isQuestDialogue = questId !== "intro";
  const background = isQuestDialogue ? baseWallpaper : introWallpaper;

  const getSpeakerAsset = (speaker: string) => {
    if (speaker === "Elli") return elliPortrait;
    if (speaker === "The Last Banker") {
      // Banker hidden during intro
      return isQuestDialogue ? bankerPortrait : null;
    }
    return null;
  };

  /**
   * Navigation logic
   */
  const handleNext = () => {
    if (!isLastLine) {
      setCurrentIndex(i => i + 1);
      return;
    }

    // Finished intro
    if (questId === "intro") {
      setGameState({
        ...gameState,
        player: { ...gameState.player, hasSeenIntro: true }
      });

      navigate("/dialogue/quest1");
      return;
    }

    // Finished quest dialogue → map
    navigate("/map");
  };

  /**
   * Glossary interaction
   */
  const handleTermClick = (termLower: string) => {
    const def = GLOSSARY[termLower];
    if (!def) return;

    setGlossaryItem({ term: termLower, definition: def });
    setGlossaryOpen(true);
  };

  // Guard against empty dialogue arrays
  if (!currentLine) return null;

  return (
    <div
      className="dialogue-page-container"
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        transition: "background-image 1.2s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1
        }}
      />

      <Modal
        type="dialogue"
        style={{
          width: "min(95vw, 750px)",
          zIndex: 10,
          background: "rgba(12, 8, 20, 0.98)",
          border: "1px solid #7c3aed"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.5rem"
          }}
        >
          {/* Header */}
          <div className="dialogue-header">
            <div className="portrait-placeholder">
              {getSpeakerAsset(currentLine.speaker) ? (
                <img
                  src={getSpeakerAsset(currentLine.speaker)!}
                  alt={currentLine.speaker}
                  className="portrait-image"
                />
              ) : (
                <div className="no-image-text">??</div>
              )}
            </div>

            <h3 className="speaker-name">
              {currentLine.speaker.toUpperCase()}
            </h3>
          </div>

          {/* Dialogue text */}
          <div
            style={{
              minHeight: "130px",
              display: "flex",
              alignItems: "flex-start",
              paddingTop: "10px"
            }}
          >
            <div className="dialogue-text-content">
              <HighlightableText
                text={formatDialogueText(currentLine.text)}
                terms={Object.keys(GLOSSARY)}
                onTermClick={handleTermClick}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="dialogue-nav">
            <Button
              onClick={() => setCurrentIndex(i => i - 1)}
              disabled={currentIndex === 0}
            >
              ←
            </Button>

            <span className="dialogue-counter">
              {questId.toUpperCase()} — {currentIndex + 1} / {dialogues.length}
            </span>

            <Button onClick={handleNext}>
              {isLastLine && questId !== "intro" ? "To the Map" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Glossary modal */}
      <GlossaryModal
        open={glossaryOpen}
        term={glossaryItem?.term}
        definition={glossaryItem?.definition}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}
