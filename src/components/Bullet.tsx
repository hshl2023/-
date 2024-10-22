import React from 'react';

interface BulletProps {
  x: number;
  y: number;
}

const Bullet: React.FC<BulletProps> = ({ x, y }) => {
  return (
    <div
      className="absolute bg-yellow-400 rounded-full"
      style={{ left: x - 2, top: y - 2, width: 4, height: 4 }}
    />
  );
};

export default Bullet;