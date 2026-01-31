import { useGame } from '../../app/GameProvider';

/**
 * Helper function to create SVG arc path
 * @param centerX - X coordinate of circle center
 * @param centerY - Y coordinate of circle center
 * @param radius - Radius of the circle
 * @param startAngle - Start angle in degrees
 * @param endAngle - End angle in degrees
 * @returns SVG path string
 */
function createArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', centerX, centerY,
    'Z'
  ].join(' ');
}

/**
 * Convert polar coordinates to Cartesian
 */
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

export default function ClarityPuzzle() {
  const { gameState } = useGame();
  const { clarity, completedQuests } = gameState.player;

  // Check which quests are completed (excluding quest4)
  const quest1Completed = completedQuests.includes('quest1');
  const quest2Completed = completedQuests.includes('quest2');
  const quest3Completed = completedQuests.includes('quest3');

  // Determine opacity for each segment
  // Default opacity is 0.3, full opacity is 1.0
  const segment1Opacity = quest1Completed ? 1.0 : 0.3;
  const segment2Opacity = quest2Completed ? 1.0 : 0.3;
  const segment3Opacity = quest3Completed ? 1.0 : 0.3;

  // If clarity is 100%, ensure all segments are fully saturated
  const finalOpacity = clarity >= 100 ? 1.0 : undefined;

  const size = 120;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 5; // Leave some padding

  // Each segment is 120 degrees
  // Segment 1: 0° to 120°
  // Segment 2: 120° to 240°
  // Segment 3: 240° to 360° (0°)
  const segment1Path = createArcPath(centerX, centerY, radius, 0, 120);
  const segment2Path = createArcPath(centerX, centerY, radius, 120, 240);
  const segment3Path = createArcPath(centerX, centerY, radius, 240, 360);

  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(255, 0, 255, 0.5))',
        }}
      >
        {/* Segment 1 (0° to 120°) */}
        <path
          d={segment1Path}
          fill="#ff00ff"
          opacity={finalOpacity ?? segment1Opacity}
          stroke="#ff66ff"
          strokeWidth="1"
          style={{
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        
        {/* Segment 2 (120° to 240°) */}
        <path
          d={segment2Path}
          fill="#ff00ff"
          opacity={finalOpacity ?? segment2Opacity}
          stroke="#ff66ff"
          strokeWidth="1"
          style={{
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        
        {/* Segment 3 (240° to 360°) */}
        <path
          d={segment3Path}
          fill="#ff00ff"
          opacity={finalOpacity ?? segment3Opacity}
          stroke="#ff66ff"
          strokeWidth="1"
          style={{
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        
        {/* Center circle for visual effect */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.3}
          fill="rgba(20, 0, 20, 0.8)"
          stroke="#ff00ff"
          strokeWidth="1"
          opacity={0.6}
        />
      </svg>
    </div>
  );
}
