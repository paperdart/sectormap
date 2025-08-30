import { SeededRandom } from './seededRandom';
import { HexData } from '../types/hex';

export async function generateHexData(sector: string): Promise<Record<string, HexData>> {
  const rng = new SeededRandom(sector);
  const hexLookup: Record<string, HexData> = {};
  
  // Load planet names
  let planetNames: string[] = [];
  try {
    const response = await fetch('/names.json');
    planetNames = await response.json();
  } catch (error) {
    console.warn('Could not load planet names, using fallback');
    planetNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
  }

  const worldTypes = ['Terran', 'Desert', 'Ocean', 'Ice', 'Volcanic', 'Gas Giant', 'Industrial', 'Agricultural'];

  // Generate data for 11x11 grid (1-9, A, B)
  const coords = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B'];
  
  for (const x of coords) {
    for (const y of coords) {
      const key = `${x},${y}`;
      if (x=='1' || x=='B' || y=='1' || y=='B')
      {}
      // 10% chance of having a planet
      else if (rng.nextBoolean(0.2)) {
        const nameIndex = rng.nextInt(0, planetNames.length - 1);
        const suffix = rng.nextInt(1, 999);
        const worldTypeIndex = rng.nextInt(0, worldTypes.length - 1);
        
        hexLookup[key] = {
          x,
          y,
          name: `${planetNames[nameIndex]}-${suffix}`,
          worldtype: worldTypes[worldTypeIndex]
        };
      }
    }
  }

  return hexLookup;
}