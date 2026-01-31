// pages/IntroPage.tsx

import { useState, useEffect } from 'react';
import LoreText from '../components/ui/LoreText';
import StartButton from '../components/ui/StartButton';
import WarningText from '../components/ui/WarningText';
import mainWallpaper from '../assets/images/main_wallpaper.png';

type IntroStage = "boot" | "lore" | "warning" | "ready";

export default function IntroPage() {
  const [stage, setStage] = useState<IntroStage>("boot");

  useEffect(() => {
    // Start showing lore after initial delay
    const timer = setTimeout(() => setStage("lore"), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoreComplete = () => {
    // Show warning after lore slides complete
    setStage("warning");
    // Show start button after a short delay
    setTimeout(() => setStage("ready"), 2000);
  };

  return (
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
      {stage === "lore" && <LoreText onComplete={handleLoreComplete} />}
      {(stage === "warning" || stage === "ready") && <WarningText />}
      {stage === "ready" && <StartButton />}
    </div>
  );
}
