import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import HighlightableText from '../components/ui/HiglightableText';
import GlossaryModal from '../components/ui/GlossaryModal';
import { GLOSSARY } from '../data/glossary';
import { DIALOGUE, formatDialogueText } from "../data/dialogue"; // Import data
import mainWallpaper from '../assets/images/main_wallpaper.png';
import type { QuestId } from "../game/types";
import "../styles/dialogue.css";

export default function DialoguePage() {
  const { questId } = useParams<{ questId: QuestId }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Glossary State
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryItem, setGlossaryItem] = useState<{ term: string; definition: string } | null>(null);

  // Get dialogues from homeBase data based on URL param
  const dialogues = useMemo(() => {
    if (!questId || !DIALOGUE.homeBase[questId]) return [];
    return DIALOGUE.homeBase[questId];
  }, [questId]);

  useEffect(() => { setCurrentIndex(0); }, [questId]);

  if (dialogues.length === 0) {
    return <div style={{ color: 'white' }}>Dialogue not found for {questId}</div>;
  }

  const currentLine = dialogues[currentIndex];
  const isLast = currentIndex === dialogues.length - 1;

  const handleTermClick = (termLower: string) => {
    const def = GLOSSARY[termLower];
    if (def) {
      setGlossaryItem({ term: termLower, definition: def });
      setGlossaryOpen(true);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', inset: 0, backgroundImage: `url(${mainWallpaper})`, 
      backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)' }} />

      <Modal type="dialogue" style={{ width: "min(92vw, 650px)", zIndex: 10, background: 'rgba(12, 8, 20, 0.98)', border: '1px solid #7c3aed' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
          
          <div className="speaker-label">
            <h3 style={{ color: '#a78bfa', fontSize: '0.8rem', letterSpacing: '3px', margin: 0 }}>
              {currentLine.speaker.toUpperCase()}
            </h3>
          </div>

          <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center' }}>
            <p style={{ color: '#fff', fontSize: '1.2rem', lineHeight: '1.8', fontStyle: 'italic', width: '100%' }}>
              <HighlightableText
                text={formatDialogueText(currentLine.text)}
                terms={Object.keys(GLOSSARY)}
                onTermClick={handleTermClick}
              />
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2e1065', paddingTop: '1rem' }}>
            <Button onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>←</Button>
            <span style={{ color: '#7c3aed', fontSize: '0.9rem' }}>{currentIndex + 1} / {dialogues.length}</span>
            <Button onClick={() => isLast ? navigate('/map') : setCurrentIndex(i => i + 1)}>
              {isLast ? "Proceed to Map" : "Next"}
            </Button>
          </div>
        </div>
      </Modal>

      <GlossaryModal
        open={glossaryOpen}
        term={glossaryItem?.term}
        definition={glossaryItem?.definition}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}