// components/ui/LoreText.tsx

export default function LoreText() {
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
    }}>
      <p>
        In a world where knowledge is power, you must battle through challenges
        to prove your worth. Each question answered correctly brings you closer
        to victory, but one wrong answer could spell your doom.
      </p>
    </div>
  );
}
