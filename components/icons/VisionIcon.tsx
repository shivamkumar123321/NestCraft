import React from 'react';

export const VisionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.2 4.2l4.6 4.6m-1.5-6.1a2 2 0 112.8 2.8L6.5 21.5H3v-3.5L14.2 4.2z" />
  </svg>
);