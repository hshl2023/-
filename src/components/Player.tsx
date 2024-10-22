import React from 'react';
import { Plane } from 'lucide-react';

interface PlayerProps {
  x: number;
  y: number;
}

const Player: React.FC<PlayerProps> = ({ x, y }) => {
  return (
    <Plane
      className="absolute text-blue-500"
      style={{ left: x - 24, top: y - 24 }}
      size={48}
    />
  );
};

export default Player;