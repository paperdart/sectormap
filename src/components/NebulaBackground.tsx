import React from 'react';
import { NebulaLayer } from '../utils/nebulaGenerator';

interface NebulaBackgroundProps {
  layers: NebulaLayer[];
}

export const NebulaBackground: React.FC<NebulaBackgroundProps> = ({ layers }) => {
  return (
    <div className="nebula-background">
      {layers.map((layer, index) => (
        <div
          key={index}
          className="nebula-layer"
          style={{
            position: 'absolute',
            left: `${layer.x}%`,
            top: `${layer.y}%`,
            width: `${layer.size}%`,
            height: `${layer.size}%`,
            background: `radial-gradient(ellipse, ${layer.color} 0%, transparent 70%)`,
            opacity: layer.opacity,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
      ))}
      
      {/* Base space background */}
      <div 
        className="space-base"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #000011 0%, #001122 50%, #000011 100%)',
          zIndex: -1,
        }}
      />
    </div>
  );
};