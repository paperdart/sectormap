import React from 'react';
import { SeededRandom } from '../utils/seededRandom';

interface StarFieldProps {
  sector: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  animationDelay: number;
}

export const StarField: React.FC<StarFieldProps> = ({ sector }) => {
  const generateStars = (): Star[] => {
    const rng = new SeededRandom(`${sector}-stars`);
    const stars: Star[] = [];
    const starCount = rng.nextInt(200, 400);
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: rng.next() * 100, // 0-100%
        y: rng.next() * 100, // 0-100%
        size: rng.nextBoolean(0.8) ? 1 : rng.nextBoolean(0.7) ? 2 : 3, // Mostly 1px, some 2-3px
        brightness: rng.next() * 0.6 + 0.4, // 0.4 to 1.0
        animationDelay: rng.next() * 4, // 0-4 seconds delay
      });
    }
    
    return stars;
  };

  const stars = generateStars();

  return (
    <div className="star-field">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            opacity: star.brightness,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.8})`,
            animation: `twinkle 3s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};