import React from 'react';

export const GenerateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 2.5v1m5.3 1.2l-.7.7M19.5 12h-1M5.5 12h-1m2.3-5.3l-.7-.7m10.8 10.8a4.5 4.5 0 11-6.36 0l-.6-.6a3 3 0 00-4.24 0v-1.41a2 2 0 01-3.41-1.42 2 2 0 011.41-1.41h1.41a3 3 0 000-4.24l.6-.6a4.5 4.5 0 016.36 0z"
    />
  </svg>
);