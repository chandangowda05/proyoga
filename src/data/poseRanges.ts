export type PoseRanges = {
  [poseName: string]: {
    leftElbow?: { min: number; max: number; message: string };
    rightElbow?: { min: number; max: number; message: string };
    leftKnee?: { min: number; max: number; message: string };
    rightKnee?: { min: number; max: number; message: string };
    leftHip?: { min: number; max: number; message: string };
    rightHip?: { min: number; max: number; message: string };
    shoulderAlignment?: { max: number; message: string };
  }
};

export const POSE_RANGES: PoseRanges = {
  'Warrior II': {
    leftKnee: { min: 80, max: 100, message: 'Bend your left knee more to a 90-degree angle' },
    rightKnee: { min: 160, max: 180, message: 'Keep your right leg straight' },
    leftElbow: { min: 160, max: 180, message: 'Extend your left arm fully' },
    rightElbow: { min: 160, max: 180, message: 'Extend your right arm fully' },
    shoulderAlignment: { max: 15, message: 'Keep your shoulders level and relaxed' }
  },
  'Tree Pose': {
    leftKnee: { min: 30, max: 60, message: 'Bring your left foot higher on your inner thigh' },
    rightKnee: { min: 160, max: 180, message: 'Keep your standing leg straight' },
    shoulderAlignment: { max: 10, message: 'Drop your shoulders away from your ears' }
  },
  'Mountain Pose': {
    leftKnee: { min: 170, max: 180, message: 'Stand tall, legs straight' },
    rightKnee: { min: 170, max: 180, message: 'Stand tall, legs straight' },
    shoulderAlignment: { max: 10, message: 'Relax your shoulders' }
  }
};
