import { useState, useEffect } from 'react';
import { Button } from './Button';

const LORE_SLIDES = [
  "Slide 1 text...",
  "Slide 2 text...",
  "Slide 3 text...",
  "Slide 4 text..."
];

interface LoreTextProps {
  onComplete?: () => void;
}

export default function LoreText({ onComplete }: LoreTextProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visible, setVisible] = useState(true); // Component visibility
  const [fade, setFade] = useState(true); // Controls slide fade

  const handleNext = () => {
    setFade(false); // Start fade-out
  };

  // Trigger slide change when fade-out ends
  useEffect(() => {
    if (!fade) {
      const timer = setTimeout(() => {
        if (currentSlide < LORE_SLIDES.length - 1) {
          setCurrentSlide(prev => prev + 1);
          setFade(true); // Fade in new slide
        } else {
          setVisible(false); // Hide component after last slide
          onComplete?.();
        }
      }, 400); // match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [fade, currentSlide, onComplete]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px',
      padding: '2rem',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.87)',
      fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontSize: '1.2rem',
      lineHeight: '1.6',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '12px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ minHeight: '120px', marginBottom: '2rem', transition: 'opacity 0.4s', opacity: fade ? 1 : 0 }}>
        <p key={currentSlide}>{LORE_SLIDES[currentSlide]}</p>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button onClick={handleNext}>Next &gt;&gt;&gt;</Button>
      </div>
    </div>
  );
}
