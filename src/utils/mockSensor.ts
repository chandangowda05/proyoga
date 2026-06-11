// Realistic mock data generator for 4x4 pressure mat

export function generateMockGrid(t: number, pose: string): number[] {
  const base = new Array(16).fill(0);
  const timeSec = t / 1000;
  
  // Base noise
  const noise = () => Math.random() * 0.05;

  if (pose === 'Tree Pose') {
    // Weight entirely on one foot (say, right foot which is bottom right area: cells 10, 11, 14, 15)
    // with some sway based on sine wave
    const swayX = Math.sin(timeSec * 0.5) * 0.2;
    const swayY = Math.cos(timeSec * 0.3) * 0.1;
    
    base[10] = 0.4 + swayX + noise();
    base[11] = 0.5 - swayX + noise();
    base[14] = 0.7 + swayY + noise();
    base[15] = 0.6 - swayY + noise();
  } 
  else if (pose === 'Warrior II') {
    // Weight spread across both feet: left foot front (cells 8, 12), right foot back (cells 11, 15)
    base[8] = 0.6 + noise();
    base[12] = 0.5 + noise();
    base[11] = 0.4 + noise();
    base[15] = 0.7 + noise();
  }
  else {
    // Generic standing (Mountain pose): weight evenly on bottom row (12, 13, 14, 15)
    const sway = Math.sin(timeSec) * 0.1;
    base[12] = 0.5 + sway + noise();
    base[13] = 0.6 + sway + noise();
    base[14] = 0.6 - sway + noise();
    base[15] = 0.5 - sway + noise();
  }

  // Ensure values stay between 0 and 1
  return base.map(val => Math.max(0, Math.min(1, val)));
}
