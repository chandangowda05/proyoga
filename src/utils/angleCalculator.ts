type Point = { x: number; y: number; visibility?: number };

export function calculateAngle(a: Point, b: Point, c: Point): number {
  if (!a || !b || !c) return 0;
  if ((a.visibility && a.visibility < 0.5) || (b.visibility && b.visibility < 0.5) || (c.visibility && c.visibility < 0.5)) {
    return 0; // Not confident enough to calculate
  }

  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return Math.round(angle);
}

// MediaPipe Pose Landmarks reference:
// 11: left shoulder, 13: left elbow, 15: left wrist
// 12: right shoulder, 14: right elbow, 16: right wrist
// 23: left hip, 25: left knee, 27: left ankle
// 24: right hip, 26: right knee, 28: right ankle

export function getElbowAngles(landmarks: Point[]) {
  if (landmarks.length < 33) return { left: 0, right: 0 };
  return {
    left: calculateAngle(landmarks[11], landmarks[13], landmarks[15]),
    right: calculateAngle(landmarks[12], landmarks[14], landmarks[16]),
  };
}

export function getKneeAngles(landmarks: Point[]) {
  if (landmarks.length < 33) return { left: 0, right: 0 };
  return {
    left: calculateAngle(landmarks[23], landmarks[25], landmarks[27]),
    right: calculateAngle(landmarks[24], landmarks[26], landmarks[28]),
  };
}

export function getHipAngles(landmarks: Point[]) {
  if (landmarks.length < 33) return { left: 0, right: 0 };
  return {
    left: calculateAngle(landmarks[11], landmarks[23], landmarks[25]),
    right: calculateAngle(landmarks[12], landmarks[24], landmarks[26]),
  };
}

export function getShoulderAlignment(landmarks: Point[]) {
  if (landmarks.length < 33) return 0;
  // Simple angle between left shoulder, right shoulder, and horizontal axis
  const l = landmarks[11];
  const r = landmarks[12];
  if (!l || !r || (l.visibility && l.visibility < 0.5) || (r.visibility && r.visibility < 0.5)) return 0;
  
  const dx = r.x - l.x;
  const dy = r.y - l.y;
  let angle = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI);
  if (angle > 90) angle = 180 - angle; // Normalize to 0 (perfectly horizontal)
  return Math.round(angle);
}
