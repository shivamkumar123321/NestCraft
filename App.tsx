import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import type { HomeSpecifications } from './types';
import { generateLayout } from './services/geminiService';
import { MoonIcon, SunIcon } from './components/icons/ThemeIcons';
import { LogoIcon } from './components/icons/LogoIcon';

const App: React.FC = () => {
  const [apiKeySet, setApiKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLayout, setGeneratedLayout] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme') === 'light') {
      return 'light';
    }
    return 'dark';
  });
  const [errors, setErrors] = useState<Record<keyof HomeSpecifications, string | null>>({
    totalArea: null,
    bedrooms: null,
    bathrooms: null,
    floors: null,
    kitchen: null,
    livingRoom: null,
    studyRoom: null,
    balconies: null,
    ceilingHeight: null,
    garden: null,
  });

  const [vision, setVision] = useState<string>("");
  const [otherFeatures, setOtherFeatures] = useState<string>("");
  const [specifications, setSpecifications] = useState<HomeSpecifications>({
    totalArea: '1200',
    bedrooms: '2',
    bathrooms: '2',
    floors: '1',
    kitchen: 'Yes',
    livingRoom: 'Yes',
    studyRoom: 'No',
    balconies: '1',
    ceilingHeight: '10',
    garden: 'No',
  });
  
  const validateField = (name: keyof HomeSpecifications, value: string): string | null => {
    if (['totalArea', 'balconies', 'ceilingHeight'].includes(name)) {
      if (!value.trim()) return 'Required';
      const num = Number(value);
      if (isNaN(num)) return 'Must be a number';
      if (name === 'balconies' && num < 0) return 'Cannot be negative';
      if ((name === 'totalArea' || name === 'ceilingHeight') && num <= 0) return 'Must be positive';
    }
    return null;
  };

  useEffect(() => {
    setApiKeySet(!!process.env.API_KEY);
    
    const initialErrors: Record<string, string | null> = {};
    for (const key in specifications) {
        initialErrors[key as keyof HomeSpecifications] = validateField(key as keyof HomeSpecifications, specifications[key as keyof HomeSpecifications]);
    }
    setErrors(initialErrors as Record<keyof HomeSpecifications, string | null>);
  }, [specifications]);

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  }, [theme]);


  const handleSpecChange = useCallback((field: keyof HomeSpecifications, value: string) => {
    setSpecifications(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({...prev, [field]: validateField(field, value)}));
  }, []);

  const handleGenerateLayout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedLayout('');

    try {
      const response = await generateLayout({
        vision,
        specifications,
        otherFeatures,
      });
      setGeneratedLayout(response);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate layout: ${errorMessage}`);
      setGeneratedLayout('Could not generate a layout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [vision, specifications, otherFeatures]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);
  
  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const hasErrors = Object.values(errors).some(e => e !== null);

  return (
    <div className="flex flex-col h-screen font-sans bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <header className="bg-light-surface dark:bg-dark-surface flex items-center justify-between px-4 sm:px-6 h-20 shrink-0 z-10 shadow-soft-light dark:shadow-soft-dark">
        <LogoIcon className="h-10" />
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full text-light-text-soft dark:text-dark-text-soft hover:bg-light-bg dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-light-surface dark:focus:ring-offset-dark-surface transition-all duration-200 hover:scale-110 active:scale-100"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        <Sidebar
          vision={vision}
          setVision={setVision}
          specifications={specifications}
          onSpecChange={handleSpecChange}
          otherFeatures={otherFeatures}
          setOtherFeatures={setOtherFeatures}
          onGenerateLayout={handleGenerateLayout}
          isApiKeySet={apiKeySet}
          isLoading={isLoading}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          errors={errors}
          hasErrors={hasErrors}
        />
        <MainContent
          layout={generatedLayout}
          isLoading={isLoading}
          error={error}
          onRegenerate={handleGenerateLayout}
        />
      </div>
    </div>
  );
};

export default App;