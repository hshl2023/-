import React from 'react';
import { Plane, Star, Target as TargetIcon } from 'lucide-react';

interface TargetProps {
  x: number;
  y: number;
  type: 'enemy' | 'bonus' | 'special';
}

const Target: React.FC<TargetProps> = ({ x, y, type }) => {
  const renderTarget = () => {
    switch (type) {
      case 'enemy':
        return <Plane className="text-red-500 transform rotate-180" size={40} />;
      case 'bonus':
        return <Star className="text-yellow-400" size={40} />;
      case 'special':
        return <TargetIcon className="text-purple-500" size={40} />;
    }
  };

  return (
    <div
      className="absolute"
      style={{ left: x - 20, top: y - 20 }}
    >
      {renderTarget()}
    </div>
  );
};

export default Target;