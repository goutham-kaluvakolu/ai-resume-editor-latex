import { useRecoilValue } from 'recoil';
import { themeAtom } from '../atom';
import { getThemeColors } from '../themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const currentTheme = useRecoilValue(themeAtom);
  const colors = getThemeColors(currentTheme);

  const themeStyles = {
    '--theme-background': colors.background,
    '--theme-card-bg': colors.cardBg,
    '--theme-text-primary': colors.textPrimary,
    '--theme-text-secondary': colors.textSecondary,
    '--theme-primary': colors.primary,
    '--theme-accent': colors.accent,
    '--theme-border': colors.border,
    '--theme-input-bg': colors.inputBg,
    '--theme-hover-bg': colors.hoverBg,
    '--theme-focus-ring': colors.focusRing,
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="min-h-screen transition-colors duration-300">
      {children}
    </div>
  );
};

export default ThemeProvider; 