import React, { useState } from "react";

const Counter = ({ start, max, onUpdate, id, currentDep }) => {
  const [count, setCount] = useState(start);

  const handleIncrement = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(count + 1);

      const data = {
        [currentDep]: [
          {
            id: id,
            contador: newCount,
          },
        ],
      };

      onUpdate?.(data);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(count - 1);

      const data = {
        [currentDep]: [
          {
            id: id,
            contador: newCount,
          },
        ],
      };

      onUpdate?.(data);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className="bg-meta-7 text-white px-4 py-2 rounded disabled:bg-bodydark1 cursor-pointer"
        onClick={handleDecrement}
        disabled={count <= 0}
      >
        -
      </button>
      <span className="text-lg font-semibold">{count}</span>
      <button
        className="bg-meta-3 text-white px-4 py-2 rounded disabled:bg-bodydark1 cursor-pointer"
        onClick={handleIncrement}
        disabled={count >= max}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
