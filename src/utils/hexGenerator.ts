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

  // Load world tags
  let worldTags: string[] = [];
  try {
    const response = await fetch('/worldtags.json');
    worldTags = await response.json();
  } catch (error) {
    console.warn('Could not load world tags, using fallback');
    worldTags = ['Trade Hub', 'Mining World', 'Agricultural', 'Industrial'];
  }

  // Generate data for 11x11 grid (1-9, A, B)
  const coords = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B'];
  
  for (const x of coords) {
    for (const y of coords) {
      const key = `${x},${y}`;
      // no planets on the borders
      if (x=='1' || x=='B' || y=='1' || y=='B')
      {}
      // 20% chance of having a planet
      else if (rng.nextBoolean(0.5)) {
        const nameIndex = rng.nextInt(0, planetNames.length - 1);
        const suffix = rng.nextInt(1, 999);
        
        // Select 2 different world tags
        const tag1Index = rng.nextInt(0, worldTags.length - 1);
        let tag2Index = rng.nextInt(0, worldTags.length - 1);
        // Ensure tags are different
        while (tag2Index === tag1Index) {
          tag2Index = rng.nextInt(0, worldTags.length - 1);
        }
        
        hexLookup[key] = {
          x,
          y,
          name: `${planetNames[nameIndex]}-${suffix}`,
          worldtags: [worldTags[tag1Index], worldTags[tag2Index]]
        };
      }
    }
  }

  return hexLookup;
}