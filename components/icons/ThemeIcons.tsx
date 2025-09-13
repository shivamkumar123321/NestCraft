import React from 'react';

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M12 2.5v1m0 16v1m8-9h-1M5 12H4m14.3-5.7l-.7-.7M7.4 7.4l-.7-.7m12.3 0l-.7.7M7.4 16.6l-.7.7M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M19.3 14.3a8 8 0 01-8.6-8.6A8.003 8.003 0 0012 20a8.003 8.003 0 007.3-5.7z"
    />
  </svg>
);