import React from 'react';
import type { HomeSpecifications } from '../types';
import { AlertIcon } from './icons/AlertIcon';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './icons/ChevronIcons';
import { GenerateIcon } from './icons/GenerateIcon';
import { VisionIcon } from './icons/VisionIcon';
import { SpecsIcon } from './icons/SpecsIcon';
import { FeaturesIcon } from './icons/FeaturesIcon';

interface SidebarProps {
  vision: string;
  setVision: (value: string) => void;
  specifications: HomeSpecifications;
  onSpecChange: (field: keyof HomeSpecifications, value: string) => void;
  otherFeatures: string;
  setOtherFeatures: (value: string) => void;
  onGenerateLayout: () => void;
  isApiKeySet: boolean;
  isLoading: boolean;
  isSidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  errors: Record<keyof HomeSpecifications, string | null>;
  hasErrors: boolean;
}

const Tooltip: React.FC<{ children: React.ReactNode; text: string }> = ({ children, text }) => (
  <div className="group relative flex justify-center">
    {children}
    <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-max bg-dark-surface text-dark-text text-xs rounded-lg py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
      {text}
    </span>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({
  vision,
  setVision,
  specifications,
  onSpecChange,
  otherFeatures,
  setOtherFeatures,
  onGenerateLayout,
  isApiKeySet,
  isLoading,
  isSidebarCollapsed,
  onToggleCollapse,
  errors,
  hasErrors,
}) => {
  return (
    <aside className={`relative bg-light-surface dark:bg-dark-surface shadow-soft-light dark:shadow-soft-dark rounded-2xl flex flex-col h-full transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-24 p-4' : 'w-[380px] p-6'}`}>
      
      {/* Expanded Content */}
      <div className={`transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {!isApiKeySet && (
          <div className={`bg-light-primary/20 border border-light-primary/30 text-light-text dark:bg-dark-secondary/10 dark:border-dark-secondary/20 dark:text-dark-text rounded-xl p-3 mb-6 flex items-start`}>
            <AlertIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-light-text-soft dark:text-dark-text-soft" />
            <div>
              <p className="font-semibold">Configuration Alert</p>
              <p className="text-sm">The API key is not set.</p>
            </div>
          </div>
        )}
      </div>

      <div className={`flex-grow overflow-y-auto thin-scrollbar transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="mb-4">
          <label className="flex items-center text-sm font-medium text-light-text-soft dark:text-dark-text-soft mb-2">
            <VisionIcon className="w-5 h-5 mr-2" />
            Describe Your Vision
          </label>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            placeholder="e.g., A cozy, modern farmhouse with an open-concept living area..."
            rows={5}
            className="w-full p-3 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-bg dark:border-dark-bg rounded-xl focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition placeholder:text-light-text-soft/70 dark:placeholder:text-dark-text-soft/70 hover:border-light-primary/50 dark:hover:border-dark-primary/50"
          />
        </div>

        <h2 className="flex items-center text-sm font-medium text-light-text-soft dark:text-dark-text-soft mb-3">
            <SpecsIcon className="w-5 h-5 mr-2" />
            Key Specifications
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InputGroup label="Total Area (sq ft)" value={specifications.totalArea} onChange={(e) => onSpecChange('totalArea', e.target.value)} error={errors.totalArea} />
          <SelectGroup label="Bedrooms" value={specifications.bedrooms} onChange={(e) => onSpecChange('bedrooms', e.target.value)} options={['1', '2', '3', '4', '5+']} />
          <SelectGroup label="Bathrooms" value={specifications.bathrooms} onChange={(e) => onSpecChange('bathrooms', e.target.value)} options={['1', '2', '3', '4+']} />
          <SelectGroup label="Floors" value={specifications.floors} onChange={(e) => onSpecChange('floors', e.target.value)} options={['1', '2', '3+']} />
          <SelectGroup label="Kitchen" value={specifications.kitchen} onChange={(e) => onSpecChange('kitchen', e.target.value as 'Yes' | 'No')} options={['Yes', 'No']} />
          <SelectGroup label="Living Room" value={specifications.livingRoom} onChange={(e) => onSpecChange('livingRoom', e.target.value as 'Yes' | 'No')} options={['Yes', 'No']} />
          <SelectGroup label="Study Room" value={specifications.studyRoom} onChange={(e) => onSpecChange('studyRoom', e.target.value as 'Yes' | 'No')} options={['Yes', 'No']} />
          <InputGroup label="Balconies" value={specifications.balconies} onChange={(e) => onSpecChange('balconies', e.target.value)} error={errors.balconies} />
          <InputGroup label="Ceiling Height (ft)" value={specifications.ceilingHeight} onChange={(e) => onSpecChange('ceilingHeight', e.target.value)} error={errors.ceilingHeight} />
          <SelectGroup label="Garden" value={specifications.garden} onChange={(e) => onSpecChange('garden', e.target.value as 'Yes' | 'No')} options={['Yes', 'No']} />
        </div>

        <div className="mt-4">
          <label className="flex items-center text-sm font-medium text-light-text-soft dark:text-dark-text-soft mb-2">
            <FeaturesIcon className="w-5 h-5 mr-2" />
            Other Features
          </label>
          <input
            type="text"
            value={otherFeatures}
            onChange={(e) => setOtherFeatures(e.target.value)}
            placeholder="e.g., swimming pool, garage, fireplace"
            className="w-full p-2 text-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-bg dark:border-dark-bg rounded-xl focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent transition placeholder:text-light-text-soft/70 dark:placeholder:text-dark-text-soft/70 hover:border-light-primary/50 dark:hover:border-dark-primary/50"
          />
        </div>
      </div>
      
      {/* Collapsed Content */}
      <div className={`absolute top-0 left-0 w-full h-full p-4 flex flex-col items-center transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center space-y-10 mt-8">
            <Tooltip text="Describe Your Vision">
                <VisionIcon className="h-7 w-7 text-light-text-soft dark:text-dark-text-soft hover:text-light-accent dark:hover:text-dark-accent transition-colors" />
            </Tooltip>
            <Tooltip text="Key Specifications">
                <SpecsIcon className="h-7 w-7 text-light-text-soft dark:text-dark-text-soft hover:text-light-accent dark:hover:text-dark-accent transition-colors" />
            </Tooltip>
            <Tooltip text="Other Features">
                <FeaturesIcon className="h-7 w-7 text-light-text-soft dark:text-dark-text-soft hover:text-light-accent dark:hover:text-dark-accent transition-colors" />
            </Tooltip>
        </div>
      </div>


      <div className="mt-auto pt-6 border-t border-light-bg dark:border-dark-bg">
        <button
          onClick={onGenerateLayout}
          disabled={isLoading || hasErrors}
          className="w-full bg-gradient-to-br from-light-secondary to-light-accent text-light-text dark:from-dark-primary dark:to-dark-accent dark:text-dark-bg font-bold py-3 px-4 rounded-xl transition-all duration-300 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-600 dark:disabled:to-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.03] active:scale-100 disabled:transform-none shadow-md hover:shadow-lg disabled:shadow-none shadow-light-accent/30 dark:shadow-dark-accent/20 hover:shadow-light-accent/50 dark:hover:shadow-dark-accent/40"
          aria-label={isSidebarCollapsed ? 'Generate Layout' : undefined}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : isSidebarCollapsed ? <GenerateIcon className="h-7 w-7" /> : 'Generate Layout'}
        </button>
      </div>
       <button 
        onClick={onToggleCollapse} 
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-light-surface dark:bg-dark-surface h-12 w-6 rounded-r-lg border-r border-y border-light-bg dark:border-dark-bg hover:bg-light-bg dark:hover:bg-dark-bg flex items-center justify-center text-light-text-soft dark:text-dark-text-soft transition-all duration-200 shadow-soft-light dark:shadow-soft-dark"
        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? <ChevronDoubleRightIcon className="w-4 h-4" /> : <ChevronDoubleLeftIcon className="w-4 h-4" />}
       </button>
    </aside>
  );
};

const InputGroup: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string | null; }> = ({ label, value, onChange, error }) => {
  const inputClasses = `w-full p-2 text-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border rounded-lg transition ${
    error
      ? 'border-red-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500'
      : 'border-transparent hover:border-light-primary/50 dark:hover:border-dark-primary/50 focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent'
  }`;
  
  return (
    <div>
      <label className="block text-xs font-medium text-light-text-soft dark:text-dark-text-soft mb-1">{label}</label>
      <input type="text" value={value} onChange={onChange} className={inputClasses} />
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

const SelectGroup: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; }> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-medium text-light-text-soft dark:text-dark-text-soft mb-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full p-2 text-sm bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-transparent rounded-lg focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition hover:border-light-primary/50 dark:hover:border-dark-primary/50 appearance-none bg-no-repeat bg-right pr-8 bg-[position:right_0.5rem_center] bg-[size:1.5em_1.5em] bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%238A7F75%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')] dark:bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%23A49DAA%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')]">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default Sidebar;