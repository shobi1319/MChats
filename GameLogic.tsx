// GameLogic.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Obstacle {
  id: number;
  left: number;
  top: number;
  color: string;
  shape: string;
  speed: number;
}

const GameLogic = () => {
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 550 });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const loadBestScore = async () => {
      const storedBestScore = await AsyncStorage.getItem('bestScore');
      if (storedBestScore) setBestScore(parseInt(storedBestScore, 10));
    };
    loadBestScore();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const obstacleInterval = setInterval(spawnObstacle, Math.max(2000 - level * 200, 500));
      const moveObstaclesInterval = setInterval(updateObstacles, 50);

      return () => {
        clearInterval(obstacleInterval);
        clearInterval(moveObstaclesInterval);
      };
    }
  }, [gameOver, score]);

  const spawnObstacle = () => {
    const newObstacle = {
      id: Date.now(),
      left: Math.random() * 300,
      top: -50,
      color: getRandomColor(),
      shape: getRandomShape(),
      speed: Math.random() * (5 + level) + 5,
    };
    setObstacles((prev) => [...prev, newObstacle]);
  };

  const updateObstacles = () => {
    setObstacles((prevObstacles) =>
      prevObstacles
        .map((obstacle) => {
          if (obstacle.top >= 600) {
            setScore((prevScore) => prevScore + 1);
            return null;
          }
          return { ...obstacle, top: obstacle.top + obstacle.speed };
        })
        .filter((obstacle) => obstacle !== null) as Obstacle[]
    );
  };

  const detectCollision = (obstacle: Obstacle) => {
    const ballRadius = 25;
    const obstacleSize = 50;
    return (
      ballPosition.x < obstacle.left + obstacleSize &&
      ballPosition.x + ballRadius * 2 > obstacle.left &&
      ballPosition.y < obstacle.top + obstacleSize &&
      ballPosition.y + ballRadius * 2 > obstacle.top
    );
  };

  useEffect(() => {
    obstacles.forEach((obstacle) => {
      if (detectCollision(obstacle)) {
        setGameOver(true);
        saveBestScore();
      }
    });
  }, [ballPosition, obstacles]);

  const saveBestScore = async () => {
    if (score > bestScore) {
      await AsyncStorage.setItem('bestScore', score.toString());
      setBestScore(score);
    }
  };

  const restartGame = () => {
    setScore(0);
    setObstacles([]);
    setBallPosition({ x: 0, y: 550 });
    setGameOver(false);
    setLevel(1);
  };

  const getRandomColor = () => {
    const colors = ['red', 'green', 'purple', 'orange', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomShape = () => {
    const shapes = ['square', 'triangle', 'rectangle']; // No 'circle' here
    return shapes[Math.floor(Math.random() * shapes.length)];
  };
  

  return {
    ballPosition,
    setBallPosition,
    obstacles,
    score,
    bestScore,
    gameOver,
    level,
    restartGame,
  };
};

export default GameLogic;
