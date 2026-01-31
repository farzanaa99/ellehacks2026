interface StatsBarProps {
  label: string;         
  value: number;          
  max: number;            
  width?: string;        
  height?: string;      
  color?: string;        
}

const StatsBar = ({
  label,
  value,
  max,
  width = '300px',
  height = '24px',
  color = '#ff00ff',
}: StatsBarProps) => {
  const percentage = Math.min(Math.max(value / max, 0), 1) * 100;

  return (
    <div style={{ marginBottom: '1rem', width }}>
      <div
        style={{
          fontFamily: '"Orbitron", system-ui, Avenir, Helvetica, Arial, sans-serif',
          color: '#fff',
          marginBottom: '4px',
          fontWeight: 'bold',
        }}
      >
        {label}: {value}/{max}
      </div>
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: 'rgba(20, 0, 20, 0.8)',
          border: '2px solid #ff00ff',
          borderRadius: '8px',
          boxShadow: '0 0 12px #ff00ff, inset 0 0 8px rgba(255,0,255,0.2)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease',
            boxShadow: '0 0 8px #ff00ff, inset 0 0 4px rgba(255,0,255,0.3)',
          }}
        />
      </div>
    </div>
  );
};

export default StatsBar;
