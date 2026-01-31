// pages/IntroPage.tsx

import { useState, useEffect } from 'react';
import LoreText from '../components/ui/LoreText';
import StartButton from '../components/ui/StartButton';

type IntroStage = "boot" | "lore" | "warning" | "ready";

export default function IntroPage() {
  const [stage, setStage] = useState<IntroStage>("boot");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage("lore"), 1000),
      setTimeout(() => setStage("warning"), 5000),
      setTimeout(() => setStage("ready"), 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {stage === "lore" && <LoreText />}
      {stage === "ready" && <StartButton />}
    </>
  );
}
