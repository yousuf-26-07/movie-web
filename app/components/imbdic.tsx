"use client";
import React from "react";

interface IMDbRatingProps {
  rating: number; // e.g., 8.5
  size?: number; // diameter in px
}

export default function IMDbRating({ rating, size = 40 }: IMDbRatingProps) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (rating / 10) * circumference;

  const color =
    rating >= 7 ? "#21d07a" : rating >= 5 ? "#d2d531" : "#db2360";

  return (
    <div className="flex flex-col pr-4 items-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg className="transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#444"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
          {rating.toFixed(1)}
        </div>
      </div>
      <span className="text-xs text-yellow-500 mt-1 font-bold">IMDb</span>
    </div>
  );
}
