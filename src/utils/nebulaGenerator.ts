import { SeededRandom } from './seededRandom';

export interface NebulaLayer {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

export function generateNebulaBackground(sector: string): NebulaLayer[] {
  const rng = new SeededRandom(sector);
  const layers: NebulaLayer[] = [];
  
  // Color palettes for different nebula types
  const colorPalettes = [
    ['#ff6b9d', '#c44569', '#f8b500'], // Pink/Orange
    ['#4834d4', '#686de0', '#30336b'], // Blue/Purple
    ['#00d2d3', '#ff9ff3', '#54a0ff'], // Cyan/Pink
    ['#ff6348', '#ff9ff3', '#feca57'], // Red/Yellow
    ['#5f27cd', '#00d2d3', '#01a3a4'], // Purple/Teal
    ['#ff3838', '#ff9500', '#ffdd59'], // Red/Orange
  ];
  
  // Select a color palette based on sector
  const paletteIndex = rng.nextInt(0, colorPalettes.length - 1);
  const palette = colorPalettes[paletteIndex];
  
  // Generate 15-30 nebula layers
  const layerCount = rng.nextInt(5, 30);
  
  for (let i = 0; i < layerCount; i++) {
    const colorIndex = rng.nextInt(0, palette.length - 1);
    const layer: NebulaLayer = {
      x: rng.nextInt(0, 100),
      y: rng.nextInt(0, 100),
      size: rng.nextInt(20, 80),
      color: palette[colorIndex],
      opacity: rng.next() * 0.3 + 0.1, // 0.1 to 0.4
    };
    layers.push(layer);
  }
  
  return layers;
}