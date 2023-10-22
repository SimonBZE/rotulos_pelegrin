import React from 'react';

export const ProgressBar = ({ percentage }) => {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#8cd8f9" // Color gris para la parte faltante
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#3fc3d1" // Color rojo para la parte avanzada
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          fill="transparent"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-graydark font-semibold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

