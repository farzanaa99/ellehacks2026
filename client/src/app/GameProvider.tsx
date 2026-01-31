import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { GameState } from "../game/state";
import { loadGameState, saveGameState, resetGameState } from "../game/state";

type GameContextType = {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => loadGameState());

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const resetGame = () => {
    const newState = resetGameState();
    setGameState(newState);
  };

  return (
    <GameContext.Provider value={{ gameState, setGameState, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
