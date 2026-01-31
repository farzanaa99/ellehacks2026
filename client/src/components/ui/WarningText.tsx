// components/ui/WarningText.tsx

export default function WarningText() {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'red',
      fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textShadow: '0 0 10px red, 0 0 20px red',
      zIndex: 1001,
      padding: '1rem 2rem',
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '12px',
      backdropFilter: 'blur(4px)',
      border: '2px solid rgba(255, 0, 0, 0.5)',
    }}>
      "Influx is watching… proceed carefully."
    </div>
  );
}
