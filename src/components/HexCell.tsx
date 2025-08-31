import React from 'react';
import { HexData } from '../types/hex';

interface HexCellProps {
  x: string;
  y: string;
  data?: HexData;
  size: number;
  onClick?: () => void;
}

export const HexCell: React.FC<HexCellProps> = ({ x, y, data, size, onClick }) => {
  const isPopulated = !!data;
  
  // Calculate hex points for SVG polygon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + (Math.PI / 6); // Add 30 degrees rotation
    const px = size * Math.cos(angle);
    const py = size * Math.sin(angle);
    points.push(`${px},${py}`);
  }
  
  return (
    <g className="hex-cell" onClick={onClick} style={{ cursor: 'pointer' }}>
      <polygon
        points={points.join(' ')}
        className={`hex-shape ${isPopulated ? 'hex-populated' : 'hex-empty'}`}
        stroke="#00ff41"
        strokeWidth="1"
        fill={isPopulated ? "rgba(0, 255, 65, 0.3)" : "rgba(0, 255, 65, 0.05)"}
      />
      
      {/* Coordinate text */}
      <text
        x="0"
        y="-8"
        textAnchor="middle"
        className="coordinate-text"
        fontSize="12"
        fill={isPopulated ? "#003311" : "#00ff41"}
      >
        {x},{y}
      </text>
      
      {/* World data */}
      {isPopulated && (
        <g className="world-data">
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="12"
            fill="#002200"
            fontWeight="bold"
          >
            {data.name}
          </text>
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fontSize="6"
            fill="#003300"
          >
            {data.worldtype}
          </text>
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fontSize="10"
            fill="#003300"
          >
            {data.worldtype}
          </text>
        </g>
      )}
    </g>
  );
};