import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../atom';
import { themes } from '../themes';
import { ChevronDownIcon, SwatchIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeAtom);
  const [isOpen, setIsOpen] = useState(false);
  const colors = themes[currentTheme].colors;

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName as any);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-md"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.border,
          color: colors.textPrimary
        }}
      >
        <SwatchIcon className="w-5 h-5" />
        <span className="font-medium">{themes[currentTheme].name}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg z-50"
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`
          }}
        >
          <div className="py-1">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-150 ${
                  currentTheme === key ? 'font-semibold' : ''
                }`}
                style={{
                  color: currentTheme === key ? colors.primary : colors.textPrimary,
                  backgroundColor: currentTheme === key ? colors.hoverBg : 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = currentTheme === key ? colors.hoverBg : 'transparent';
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0"
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.border
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{theme.name}</div>
                  {theme.description && (
                    <div 
                      className="text-xs mt-1 leading-tight"
                      style={{ color: colors.textSecondary }}
                    >
                      {theme.description}
                    </div>
                  )}
                </div>
                {currentTheme === key && (
                  <div className="flex-shrink-0">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher; 