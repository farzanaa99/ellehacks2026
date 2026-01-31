import { useNavigate } from "react-router-dom";
import "../styles/homebase.css";

export default function HomeBasePage() {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    // Navigate to the game world (you can change this route later)
    navigate("/battle");
  };

  return (
    <div className="homebase-container">
      <div className="homebase-content">
        <div className="title-container">
          <h1 className="pixel-title">Financial Quest</h1>
        </div>
        
        <div className="menu-container">
          <button className="pixel-button" onClick={handlePlayGame}>
            Play Game
          </button>
        </div>
      </div>
    </div>
  );
}

