import React from 'react';

export const SpecsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5V5m0 2.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-6 7V12m0 2.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12-1.5V12m0 2.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h1m14 0h1M4 18h7m2 0h7" />
  </svg>
);