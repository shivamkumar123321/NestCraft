import React from 'react';

const DoodleBackground: React.FC = () => (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden opacity-50 dark:opacity-30 pointer-events-none">
        <svg className="absolute top-[10%] left-[5%] w-16 h-16 text-light-accent dark:text-dark-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12s2.5-4 7-4 7 4 7 4-2.5 4-7 4-7-4-7-4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0" />
        </svg>
        <svg className="absolute bottom-[15%] right-[10%] w-20 h-20 text-light-secondary dark:text-dark-primary -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg className="absolute top-[20%] right-[20%] w-12 h-12 text-light-primary dark:text-dark-secondary rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    </div>
);

export default DoodleBackground;