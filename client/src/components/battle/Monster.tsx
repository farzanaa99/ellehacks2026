import React from "react";
import { useGame } from "../../app/GameProvider";

import quest1Enemy1 from "../../assets/images/quest1_enemy1.png";
import quest1Enemy2 from "../../assets/images/quest1_enemy2.png";
import quest2Enemy from "../../assets/images/quest2_enemy.png";
import quest3Enemy from "../../assets/images/quest3_enemy.png";

type MonsterProps = {
  className?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

export default function Monster({ className, alt, width, height }: MonsterProps) {
  const { gameState } = useGame();
  const { currentQuest, currentFight } = gameState;

  let src = quest2Enemy; // sensible default

  switch (currentQuest) {
    case "quest1":
      // fight indexes are zero-based: 0 -> fight 1, 1 -> fight 2
      src = currentFight === 0 ? quest1Enemy1 : quest1Enemy2;
      break;
    case "quest2":
      src = quest2Enemy;
      break;
    case "quest3":
      src = quest3Enemy;
      break;
    default:
      src = quest2Enemy;
  }

  return (
    <img
      src={src}
      alt={alt ?? "monster"}
      className={className}
      style={{ width, height }}
    />
  );
}
