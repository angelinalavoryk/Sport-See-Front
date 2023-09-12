import React, { useState } from 'react';
import { Rectangle } from 'recharts';

const CustomCursor = ({ width, height }) => {
  const [cursorX, setCursorX] = useState(0);

  const handleMouseMove = (event) => {
    setCursorX(event.clientX); // Obtenez la position X de la souris
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Rectangle
        x={cursorX}
        y={0}
        width={width - cursorX}
        height={height}
        fill="rgba(0, 0, 0, 0.3)"
      />
    </div>
  );
};

export default CustomCursor;
