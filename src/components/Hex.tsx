import React from 'react';
import { HexData } from '../types/hex';

interface HexProps {
  x: number;
  y: number;
  data?: HexData;
}

export const Hex: React.FC<HexProps> = ({ x, y, data }) => {
  const isPopulated = !!data;
  
  return (
    <div className="relative hex-container">
      <div 
        className={`
          hex ${isPopulated ? 'hex-populated' : 'hex-empty'}
          relative cursor-pointer transition-all duration-300
          ${isPopulated ? 'hover:shadow-green-500/50 hover:shadow-lg' : ''}
        `}
        title={data ? `${data.name} (${data.worldtype})` : `Empty space ${x},${y}`}
        title={data ? `${data.name}` : `Empty space ${x},${y}`}
      >
        {/* Hex background */}
        <div className="hex-bg absolute inset-0"></div>
        
        {/* Coordinate display */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-1">
          <span className={`text-xs font-mono ${isPopulated ? 'text-green-200' : 'text-green-400'}`}>
            {x},{y}
          </span>
          
          {/* World data display */}
          {isPopulated && (
            <div className="mt-1">
              <div className="text-xs font-mono text-green-100 font-bold">
                {data.name}
              </div>
              {data.population && (
                <div className="text-xs font-mono text-green-400">
                  Pop: {data.population}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};