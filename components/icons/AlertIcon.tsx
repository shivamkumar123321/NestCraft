import React from 'react';

export const AlertIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className || "h-6 w-6"} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 18.115l-8.02-13.89a1 1 0 01.865-1.5h16.04a1 1 0 01.865 1.5l-8.02 13.89a1 1 0 01-1.73 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m.01 2.51v.01" />
    </svg>
);