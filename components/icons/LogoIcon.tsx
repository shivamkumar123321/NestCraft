import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
         <style>
            {`
                .stop-light-1 { stop-color: #B4E2D8; }
                .stop-light-2 { stop-color: #D8CCF2; }
                .dark .stop-light-1 { stop-color: #A7FFDF; }
                .dark .stop-light-2 { stop-color: #F2B8B8; }
            `}
        </style>
        <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" className="stop-light-1"/>
                <stop offset="100%" className="stop-light-2"/>
            </linearGradient>
        </defs>
        <path d="M5 45 V5 L25 25 V45" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M0 10 L15 0 L30 10" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="45" y="33" fontFamily="Nunito, system-ui, sans-serif" fontSize="24" fontWeight="600" className="fill-light-text dark:fill-dark-text">
            Nest
            <tspan className="fill-light-text-soft dark:fill-dark-text-soft">Craft</tspan>
        </text>
    </svg>
);