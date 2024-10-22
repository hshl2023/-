import React from 'react';
import { Plane } from 'lucide-react';

interface EnemyProps {
  x: number;
  y: number;
}

const Enemy: React.FC<EnemyProps> = ({ x, y }) => {
  return (
    <Plane
      className="absolute text-red-500 transform rotate-180"
      style={{ left: x - 20, top: y - 20 }}
      size={40}
    />
  );
};

export default Enemy;