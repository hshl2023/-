import React, { useState, useEffect, useCallback } from 'react';
import { Crosshair } from 'lucide-react';
import Player from './components/Player';
import Target from './components/Target';
import Bullet from './components/Bullet';
import GameOver from './components/GameOver';

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'enemy' | 'bonus' | 'special';
}

const App: React.FC = () => {
  const [player, setPlayer] = useState({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
  const [targets, setTargets] = useState<GameObject[]>([]);
  const [bullets, setBullets] = useState<GameObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const movePlayer = useCallback((e: MouseEvent) => {
    setPlayer({ x: e.clientX, y: e.clientY });
  }, []);

  const spawnTarget = useCallback(() => {
    const types: ('enemy' | 'bonus' | 'special')[] = ['enemy', 'enemy', 'enemy', 'bonus', 'special'];
    const type = types[Math.floor(Math.random() * types.length)];
    const newTarget = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 50),
      y: -50,
      type,
    };
    setTargets((prevTargets) => [...prevTargets, newTarget]);
  }, []);

  const shootBullet = useCallback(() => {
    const newBullet = {
      id: Date.now(),
      x: player.x,
      y: player.y - 20,
      type: 'bullet',
    };
    setBullets((prevBullets) => [...prevBullets, newBullet]);
  }, [player]);

  const updateGameObjects = useCallback(() => {
    setTargets((prevTargets) =>
      prevTargets
        .map((target) => {
          let newY = target.y;
          if (target.type === 'enemy') newY += 2;
          if (target.type === 'bonus') newY += 1;
          if (target.type === 'special') newY += Math.sin(Date.now() / 500) * 3 + 1;
          return { ...target, y: newY };
        })
        .filter((target) => target.y < window.innerHeight)
    );

    setBullets((prevBullets) =>
      prevBullets
        .map((bullet) => ({ ...bullet, y: bullet.y - 5 }))
        .filter((bullet) => bullet.y > 0)
    );

    // Check for collisions
    setTargets((prevTargets) => {
      const newTargets = prevTargets.filter((target) => {
        const hitByBullet = bullets.some(
          (bullet) =>
            Math.abs(bullet.x - target.x) < 30 && Math.abs(bullet.y - target.y) < 30
        );

        if (hitByBullet) {
          if (target.type === 'enemy') setScore((prevScore) => prevScore + 10);
          if (target.type === 'bonus') setScore((prevScore) => prevScore + 50);
          if (target.type === 'special') setScore((prevScore) => prevScore + 100);
          return false;
        }

        const collidedWithPlayer =
          Math.abs(player.x - target.x) < 40 && Math.abs(player.y - target.y) < 40;

        if (collidedWithPlayer && target.type === 'enemy') {
          setGameOver(true);
        }

        return !collidedWithPlayer;
      });

      return newTargets;
    });
  }, [bullets, player]);

  useEffect(() => {
    if (gameOver) return;

    window.addEventListener('mousemove', movePlayer);
    window.addEventListener('click', shootBullet);

    const targetInterval = setInterval(spawnTarget, 1000);
    const gameLoop = setInterval(updateGameObjects, 1000 / 60);

    return () => {
      window.removeEventListener('mousemove', movePlayer);
      window.removeEventListener('click', shootBullet);
      clearInterval(targetInterval);
      clearInterval(gameLoop);
    };
  }, [gameOver, movePlayer, shootBullet, spawnTarget, updateGameObjects]);

  const restartGame = () => {
    setTargets([]);
    setBullets([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      {!gameOver ? (
        <>
          <div className="absolute top-4 left-4 text-white text-2xl font-bold">
            Score: {score}
          </div>
          <Player x={player.x} y={player.y} />
          {targets.map((target) => (
            <Target key={target.id} x={target.x} y={target.y} type={target.type} />
          ))}
          {bullets.map((bullet) => (
            <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
          ))}
          <Crosshair
            className="absolute text-white pointer-events-none"
            style={{ left: player.x - 12, top: player.y - 12 }}
            size={24}
          />
        </>
      ) : (
        <GameOver score={score} onRestart={restartGame} />
      )}
    </div>
  );
};

export default App;