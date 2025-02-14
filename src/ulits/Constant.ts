const SCALE = 40;
const SPEED = 200;
const calculateScaledRect = (
  rect: number[],
  windowWidth: number,
  windowHeight: number
) => {
  const [x, y, w, h] = rect;
  const scaledX = (x / 1440) * windowWidth;
  const scaledY = (y / 789) * windowHeight;
  const scaledW = (w / 1440) * windowWidth;
  const scaledH = (h / 789) * windowHeight;
  return [scaledX, scaledY, scaledW, scaledH];
};

const RECTS = [
  [30, 80, 150, 20],
  [170, 80, 20, 270],
  [170, 340, 150, 20],
  [300, 80, 250, 20],
  [400, 80, 20, 150],
  [30, 380, 20, 220],
  [30, 480, 110, 20],
  [700, 80, 20, 240],
  [700, 80, 150, 20],
  [560, 300, 150, 20],
  [460, 500, 250, 20],
  [460, 420, 20, 180],
  [120, 600, 150, 20],
  [250, 500, 20, 250],
  [470, 740, 200, 20],
  [650, 600, 20, 150],
  [820, 250, 150, 20],
  [960, 130, 20, 300],
  [760, 640, 250, 20],
  [990, 540, 20, 200],
  [1100, 80, 280, 20],
  [1240, 80, 20, 250],
  [1160, 500, 250, 20],
  [1160, 500, 20, 150],
].map((rect) =>
  calculateScaledRect(rect, window.innerWidth, window.innerHeight)
);

const calculateScaledWinnerState = (state: number[]) => {
  const scaledX = (state[0] / 1440) * window.innerWidth;
  const scaledY = (state[1] / 789) * window.innerHeight;
  const scaledRadius =
    (state[2] / 1440) * Math.min(window.innerWidth, window.innerHeight);
  return [scaledX, scaledY, scaledRadius];
};

const WINNERSTATE = calculateScaledWinnerState([1400, 770, 30]);

const calculateScaledStartState = (state: number[][]) => {
  const scaledX = (state[0][0] / 1440) * window.innerWidth;
  const scaledY = (state[0][1] / 789) * window.innerHeight;
  const countX = state[0][2];
  const scaledW = (state[0][3] / 1440) * window.innerWidth;
  const scaledH = (state[0][4] / 789) * window.innerHeight;
  return [[scaledX, scaledY, countX, scaledW, scaledH]];
};

const STARTSTATE = calculateScaledStartState([[20, 0, 0, 70, 70]]);

const DIRECTIONS = {
  ArrowUp: [0, -1], // up
  ArrowDown: [0, 1], // down
  ArrowLeft: [-1, 0], // left
  ArrowRight: [1, 0], // right
};

export { RECTS, STARTSTATE, WINNERSTATE, SCALE, SPEED, DIRECTIONS };
