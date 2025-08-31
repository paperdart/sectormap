import React, { useState, useEffect } from 'react';
import { HexCell } from './HexCell';
import { HexData } from '../types/hex';
import { generateHexData } from '../utils/hexGenerator';
import { NebulaBackground } from './NebulaBackground';
import { generateNebulaBackground, NebulaLayer } from '../utils/nebulaGenerator';
import { StarField } from './StarField';
import { HexSidebar } from './HexSidebar';

export const HoneycombGrid: React.FC = () => {
  const [hexData, setHexData] = useState<Record<string, HexData>>({});
  const [sector, setSector] = useState<string>('Delphi');
  const [nebulaLayers, setNebulaLayers] = useState<NebulaLayer[]>([]);
  const [selectedHex, setSelectedHex] = useState<{ x: string; y: string; data?: HexData } | null>(null);
  const hexSize = 60;
  const gridSize = 11;
  
  useEffect(() => {
    // Get sector from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const sectorParam = urlParams.get('sector') || 'Delphi';
    setSector(sectorParam);
    
    // Generate hex data based on sector
    generateHexData(sectorParam).then(data => {
      setHexData(data);
    });
    
    // Generate nebula background based on sector
    const nebula = generateNebulaBackground(sectorParam);
    setNebulaLayers(nebula);
  }, []);

  const calculateHexPosition = (col: number, row: number) => {
    const hexWidth = hexSize * Math.sqrt(3);
    const hexHeight = hexSize * 2;
    
    const x = col * hexWidth + (row % 2) * (hexWidth / 2);
    const y = row * (hexHeight * 0.75);
    
    return { x, y };
  };

  const renderHexagons = () => {
    const hexagons = [];
    
    const toHex = (num: number) => {
      return num.toString(16).toUpperCase();
    };
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const gridX = toHex(col + 1);
        const gridY = toHex(row + 1);
        const key = `${gridX},${gridY}`;
        const data = hexData[key];
        const { x, y } = calculateHexPosition(col, row);
        
        const handleHexClick = () => {
          setSelectedHex({ x: gridX, y: gridY, data });
        };
        
        hexagons.push(
          <g key={key} transform={`translate(${x}, ${y})`}>
            <HexCell x={gridX} y={gridY} data={data} size={hexSize} onClick={handleHexClick} />
          </g>
        );
      }
    }
    
    return hexagons;
  };

  const gridWidth = (gridSize - 1) * hexSize * Math.sqrt(3) + hexSize * Math.sqrt(3);
  const gridHeight = (gridSize - 1) * hexSize * 1.5 + hexSize * 2;
  
  // Add padding to prevent cutoff
  const padding = hexSize;
  const totalWidth = gridWidth + (padding * 2);
  const totalHeight = gridHeight + (padding * 2);

  return (
    <div className="honeycomb-container" style={{ paddingRight: selectedHex ? '320px' : '0' }}>
      <NebulaBackground layers={nebulaLayers} />
      <StarField sector={sector} />
      <div className="scanlines"></div>
      
      <div className="grid-header">
        <h1 className="grid-title">SECTOR {sector.toUpperCase()}</h1>
        <div className="grid-status">SPIKE DRIVE CARTOGRAPHY ESTIMATOR</div>
      </div>
      
      <div className="svg-container">
        <svg
          width={totalWidth}
          height={totalHeight}
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="hex-grid-svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <g transform={`translate(${padding}, ${padding})`}>
            {renderHexagons()}
          </g>
        </svg>
      </div>
      
      <div className="grid-footer">
        <div className="status-line">MAP STATUS: RECENT DATA | SECTOR SIZE: 11x11</div>
      </div>
      
      <HexSidebar 
        selectedHex={selectedHex} 
        onClose={() => setSelectedHex(null)} 
      />
    </div>
  );
}