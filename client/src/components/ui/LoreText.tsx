import { useState, useEffect } from 'react';
import { Button } from './Button';

const LORE_SLIDES = [
  "Cyber Pink was once a land of many banks, where money and knowledge flowed freely.",
  
  "Then came Influx Inc, a power-hungry bank that crushed every rival in its path.",
  
  "Libraries of financial wisdom vanished overnight. Citizens forgot the past.",
  
  "Now, Influx Inc rules over 99.9999% of the population, controlling every coin."
];

interface LoreTextProps {
  onComplete?: () => void;
}

export default function LoreText({ onComplete }: LoreTextProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    setFade(false);
  };

  useEffect(() => {
    if (!fade) {
      const timer = setTimeout(() => {
        if (currentSlide < LORE_SLIDES.length - 1) {
          setCurrentSlide(prev => prev + 1);
          setFade(true);
        } else {
          setVisible(false);
          onComplete?.();
        }
      }, 400); 
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
        <Button onClick={handleNext} small={true}>
          {currentSlide === LORE_SLIDES.length - 1 ? 'Begin Quest >>>' : 'Next >>>'}
        </Button>
      </div>
    </div>
  );
}