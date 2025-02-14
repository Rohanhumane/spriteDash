import hero from "../images/sprite.png";
import classes from "./Canvas.module.css";
import { useRef, useEffect, useState, useCallback } from "react";
import { RECTS, WINNERSTATE, STARTSTATE, DIRECTIONS } from "../ulits/Constant";
import "../App.css";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [peiceXY, setPeiceXY] = useState<number[][]>(STARTSTATE);
  const [winner, setWinnerState] = useState<number[]>(WINNERSTATE);
  const [dir, setDir] = useState<number[]>([1, 0]);
  const [canvasSize, setCanvasSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isResizing, setIsResizing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGameover, setIsGameover] = useState(false);

  const rectangles = useCallback(
    (context: CanvasRenderingContext2D, transform: number) => {
      RECTS.forEach(([x, y, w, h]) => {
        const scaledX = x * transform;
        const scaledY = y * transform;
        const scaledWidth = w * transform;
        const scaledHeight = h * transform;

        context.fillStyle = "black";
        context.fillRect(scaledX, scaledY, scaledWidth, scaledHeight);
      });
    },
    []
  );

  const drawWinner = useCallback(
    (context: CanvasRenderingContext2D, transform: number) => {
      context.beginPath();
      context.fillStyle = "red";
      const scaledX = WINNERSTATE[0] * transform;
      const scaledY = WINNERSTATE[1] * transform;
      const scaledRadius = WINNERSTATE[2] * transform;
      setWinnerState([scaledX, scaledY, scaledRadius]);
      context.arc(scaledX, scaledY, scaledRadius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    },
    []
  );

  // const drawPeice = useCallback(
  //   (context: CanvasRenderingContext2D, transform: number) => {
  //     // context.setTransform(transform, 0, 0, transform, 0, 0);
  //     // context.beginPath();
  //     // context.fillStyle = "red";
  //     // const scaledX = peiceXY[0][0] * transform;
  //     // const scaledY = peiceXY[0][1] * transform;
  //     // const scaledRadius = peiceXY[0][2] * transform;
  //     // context.arc(scaledX, scaledY, scaledRadius, 0, 2 * Math.PI);
  //     // context.fill();
  //     // context.closePath();
  //   },
  //   [peiceXY]
  // );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const renderCanvas = () => {
      if (context && canvas) {
        const transform = Math.min(
          canvas.width / canvasSize[0],
          canvas.height / canvasSize[1]
        );

        const scaledWidth = canvasSize[0] * transform;
        const scaledHeight = canvasSize[1] * transform;
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.setTransform(transform, 0, 0, transform, offsetX, offsetY);
        rectangles(context, transform);
        drawWinner(context, transform);

        if (isLoaded) {
          context.drawImage(
            heroImage,
            peiceXY[0][2] * 260,
            0,
            260,
            260,
            peiceXY[0][0] * transform,
            peiceXY[0][1] * transform,
            peiceXY[0][3] * transform,
            peiceXY[0][4] * transform
          );
        }
      }
    };
    const heroImage = new Image();
    heroImage.src = hero;
    heroImage.onload = () => {
      setIsLoaded(true);
      renderCanvas();
    };

    if (!isResizing) {
      renderCanvas();
    }
  }, [canvasSize, isLoaded, drawWinner, rectangles, isResizing, peiceXY]);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      setCanvasSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isResizing) {
      setIsResizing(false);
    }
  }, [isResizing]);

  useEffect(() => {
    const gameLoop = () => {
      const peiceCopy = [...peiceXY];
      let countX = peiceCopy[0][2] + 1;
      countX %= 6;
      const newMove = [
        peiceCopy[0][0] + dir[0],
        peiceCopy[0][1] + dir[1],
        countX,
        peiceCopy[0][3],
        peiceCopy[0][4],
      ];

      const collidesWithRect = RECTS.some(([x, y, w, h]) => {
        const rectRight = x + w;
        const rectBottom = y + h;

        const heroLeft = newMove[0];
        const heroRight = newMove[0] + newMove[3];
        const heroTop = newMove[1];
        const heroBottom = newMove[1] + newMove[4];

        if (
          heroLeft < 0 ||
          heroBottom > window.innerHeight ||
          heroTop < 0 ||
          heroRight > window.innerWidth
        ) {
          return true;
        }

        return (
          heroRight >= x &&
          heroLeft <= rectRight &&
          heroBottom >= y &&
          heroTop <= rectBottom
        );
      });

      const winnerCheck = () => {
        // console.log(newMove, winner);
        if (
          Math.floor(newMove[1] + newMove[4]) >= Math.floor(winner[1]) &&
          Math.floor(newMove[0] + newMove[3]) >= Math.floor(winner[0])
        ) {
          return true;
        }
        return false;
      };

      if (winnerCheck()) {
        setSpeed(null);
        setIsGameover(true);
        console.log("winner");
      }

      if (collidesWithRect) {
        const newX = peiceCopy[0][0] - dir[0];
        const newY = peiceCopy[0][1] - dir[1];
        const heroCountX = peiceCopy[0][2];
        peiceCopy.unshift([
          newX,
          newY,
          heroCountX,
          peiceCopy[0][3],
          peiceCopy[0][4],
        ]);
      } else {
        peiceCopy.unshift(newMove);
      }

      peiceCopy.pop();
      setPeiceXY(peiceCopy);
    };

    if (speed !== null) {
      const id = setInterval(gameLoop, speed);
      return () => clearInterval(id);
    }
  }, [dir, speed, peiceXY, canvasRef, winner]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Enter") {
      setSpeed(40);
    }
    if (e.code === "ArrowUp") {
      setDir(DIRECTIONS["ArrowUp"]);
    }
    if (e.code === "ArowLeft") {
      setDir(DIRECTIONS["ArrowLeft"]);
    }
    if (e.code === "ArrowRight") {
      setDir(DIRECTIONS["ArrowRight"]);
    }
    if (e.code === "ArrowDown") {
      setDir(DIRECTIONS["ArrowDown"]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={classes.canvas}
        width={canvasSize[0]}
        height={canvasSize[1]}
      ></canvas>
      {isGameover && <h1 className="App">Game Over</h1>};
    </>
  );
};
export default Canvas;
