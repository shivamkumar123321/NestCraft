
import React from 'react';

export const MagicWandIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18L12 22M12 2L12 6M6 12L2 12M22 12L18 12M4.929 4.929L7.05 7.05M16.95 16.95L19.071 19.071M4.929 19.071L7.05 16.95M16.95 7.05L19.071 4.929M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
