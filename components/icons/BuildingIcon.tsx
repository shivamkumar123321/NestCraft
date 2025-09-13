
import React from 'react';

export const BuildingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-8 w-8 text-gray-700 dark:text-gray-300"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5V19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 4.5V19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V19.5" />
  </svg>
);
