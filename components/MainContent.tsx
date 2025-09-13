import React from 'react';
import DoodleBackground from './StarsBackground';

interface MainContentProps {
  layout: string;
  isLoading: boolean;
  error: string | null;
  onRegenerate: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ layout, isLoading, error, onRegenerate }) => {
  const Button: React.FC<{ onClick?: () => void, children: React.ReactNode, 'aria-label': string, primary?: boolean }> = ({ onClick, children, 'aria-label': ariaLabel, primary }) => {
    const baseClasses = "px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-100 flex items-center justify-center shadow-md hover:shadow-lg disabled:transform-none disabled:shadow-none";
    const primaryClasses = "bg-gradient-to-br from-light-secondary to-light-accent text-light-text dark:from-dark-primary dark:to-dark-accent dark:text-dark-bg shadow-light-accent/30 dark:shadow-dark-accent/20 hover:shadow-light-accent/50 dark:hover:shadow-dark-accent/40";
    const secondaryClasses = "bg-light-surface text-light-text hover:bg-light-bg dark:bg-dark-surface dark:text-dark-text dark:hover:bg-dark-bg";
    
    return (
      <button onClick={onClick} className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`} aria-label={ariaLabel}>
        {children}
      </button>
    );
  };
  
  return (
    <main className="flex-1 flex flex-col bg-light-surface dark:bg-dark-surface shadow-soft-light dark:shadow-soft-dark rounded-2xl relative overflow-hidden">
      <div className="flex-1 p-8 overflow-y-auto">
        {isLoading && !layout && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-light-text-soft dark:text-dark-text-soft">
                <svg className="animate-spin mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-lg">Crafting your dream layout...</p>
                <p className="text-sm">This may take a moment.</p>
            </div>
          </div>
        )}
        {error && (
            <div className="bg-red-500/10 p-4 rounded-xl">
                <h3 className="text-red-700 dark:text-red-300 font-semibold">An Error Occurred</h3>
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
        )}
        {!isLoading && !layout && !error && (
            <div className="flex items-center justify-center h-full">
                <DoodleBackground />
                <div className="text-center p-8 z-10 max-w-2xl mx-auto">
                    <div className="mb-6">
                       <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-light-secondary dark:text-dark-primary inline-block">
                          <path d="M5.28531 10.6622L11.2144 5.0761C11.6601 4.65343 12.3399 4.65343 12.7856 5.0761L18.7147 10.6622C19.4632 11.3635 18.953 12.5 18 12.5H6C5.04703 12.5 4.53685 11.3635 5.28531 10.6622Z" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M7 12.5V18.5C7 19.0523 7.44772 19.5 8 19.5H16C16.5523 19.5 17 19.0523 17 18.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">Welcome to NestCraft</h1>
                    <div className="text-lg text-light-text-soft dark:text-dark-text-soft space-y-2">
                        <p>1. Describe your vision in the sidebar</p>
                        <p>2. Adjust the specifications</p>
                        <p>3. Let's craft your dream home together!</p>
                    </div>
                </div>
            </div>
        )}
        {!isLoading && layout && (
            <div className="flex justify-center w-full h-full">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <div className="relative w-full bg-white rounded-2xl shadow-soft-light overflow-hidden p-2 border border-black/5">
                        <img src={layout} alt="Generated floor plan" className="object-contain w-full h-full rounded-xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2">
                            <div className="bg-light-surface/70 dark:bg-dark-surface/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                                    <Button
                                        onClick={onRegenerate}
                                        aria-label="Regenerate layout"
                                    >
                                        Regenerate
                                    </Button>
                                    <Button
                                        primary
                                        aria-label="Continue with this layout"
                                    >
                                        Continue
                                    </Button>
                                    <Button
                                        onClick={() => {}}
                                        primary
                                        aria-label="Create 3D view"
                                    >
                                        Create 3D
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;