import { POSE_RANGES } from '../data/poseRanges';

export type JointAngles = {
  leftElbow: number;
  rightElbow: number;
  leftKnee: number;
  rightKnee: number;
  leftHip: number;
  rightHip: number;
  shoulderAlignment: number;
};

export type Correction = {
  joint: string;
  message: string;
  severity: 'warning' | 'error';
};

export function evaluatePose(poseName: string, currentAngles: JointAngles) {
  const ranges = POSE_RANGES[poseName];
  if (!ranges) return { score: 100, corrections: [] };

  const corrections: Correction[] = [];
  let totalJointsChecked = 0;
  let correctJoints = 0;

  const checkJoint = (name: keyof typeof ranges, label: string, currentVal: number) => {
    const range = ranges[name];
    if (range) {
      totalJointsChecked++;
      
      if ('min' in range && 'max' in range) {
        if (currentVal >= range.min && currentVal <= range.max) {
          correctJoints++;
        } else {
          corrections.push({
            joint: label,
            message: range.message,
            severity: Math.abs(currentVal - range.min) > 20 || Math.abs(currentVal - range.max) > 20 ? 'error' : 'warning'
          });
        }
      } else if ('max' in range) {
        if (currentVal <= range.max) {
          correctJoints++;
        } else {
          corrections.push({
            joint: label,
            message: range.message,
            severity: currentVal - range.max > 15 ? 'error' : 'warning'
          });
        }
      }
    }
  };

  checkJoint('leftElbow', 'Left Elbow', currentAngles.leftElbow);
  checkJoint('rightElbow', 'Right Elbow', currentAngles.rightElbow);
  checkJoint('leftKnee', 'Left Knee', currentAngles.leftKnee);
  checkJoint('rightKnee', 'Right Knee', currentAngles.rightKnee);
  checkJoint('leftHip', 'Left Hip', currentAngles.leftHip);
  checkJoint('rightHip', 'Right Hip', currentAngles.rightHip);
  checkJoint('shoulderAlignment', 'Shoulders', currentAngles.shoulderAlignment);

  const score = totalJointsChecked === 0 ? 100 : Math.round((correctJoints / totalJointsChecked) * 100);

  return { score, corrections };
}
