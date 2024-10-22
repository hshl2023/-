import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white">
      <h1 className="text-4xl font-bold mb-4">Game Over</h1>
      <p className="text-2xl mb-2">Your Score: {score}</p>
      <p className="text-lg mb-8">
        Red planes: 10 pts | Yellow stars: 50 pts | Purple targets: 100 pts
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        onClick={onRestart}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;