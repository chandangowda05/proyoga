export const POSES = [
  {
    id: 'warrior-ii',
    name: 'Warrior II',
    sanskrit: 'Virabhadrasana II',
    description: 'A standing pose that builds strength and stamina while stretching the hips and groins.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800',
    steps: [
      'Stand with feet wide apart (about 4 feet).',
      'Turn your right foot out 90 degrees and your left foot in slightly.',
      'Bend your right knee until your thigh is parallel to the floor.',
      'Extend your arms out to the sides, parallel to the floor.',
      'Gaze over your right fingertips.'
    ],
    holdTime: 30, // seconds
    targetAngles: { leftKnee: 180, rightKnee: 90, leftElbow: 180, rightElbow: 180 }
  },
  {
    id: 'tree-pose',
    name: 'Tree Pose',
    sanskrit: 'Vrksasana',
    description: 'A balancing pose that improves focus and strengthens the legs and core.',
    image: 'https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?auto=format&fit=crop&q=80&w=800',
    steps: [
      'Stand tall with feet together.',
      'Shift your weight onto your left foot.',
      'Bend your right knee and place the sole of your right foot on your inner left thigh.',
      'Bring your hands to your heart or extend them overhead.',
      'Find a focal point to help maintain balance.'
    ],
    holdTime: 30,
    targetAngles: { leftKnee: 180, rightKnee: 45, leftElbow: 90, rightElbow: 90 }
  },
  {
    id: 'downward-dog',
    name: 'Downward Dog',
    sanskrit: 'Adho Mukha Svanasana',
    description: 'An inversion that stretches the entire body and rejuvenates the nervous system.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    steps: [
      'Start on your hands and knees.',
      'Tuck your toes and lift your hips up and back.',
      'Straighten your arms and legs (keep a micro-bend if needed).',
      'Press your heels toward the floor.',
      'Relax your head between your arms.'
    ],
    holdTime: 45,
    targetAngles: { leftKnee: 180, rightKnee: 180, leftElbow: 180, rightElbow: 180, leftHip: 90, rightHip: 90 }
  }
];
