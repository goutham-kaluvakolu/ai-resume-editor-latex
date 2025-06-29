export interface Theme {
  name: string;
  description?: string;
  colors: {
    background: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    primary: string;
    accent: string;
    border: string;
    inputBg: string;
    hoverBg: string;
    focusRing: string;
  };
}

export const themes: Record<string, Theme> = {
  dark: {
    name: 'Dark Mode',
    colors: {
      background: '#0F172A',
      cardBg: '#1E293B',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      primary: '#6366F1',
      accent: '#22D3EE',
      border: '#475569',
      inputBg: '#0F172A',
      hoverBg: '#1E293B',
      focusRing: '#6366F1'
    }
  },
  light: {
    name: 'Light Mode',
    colors: {
      background: '#F8FAFC',
      cardBg: '#FFFFFF',
      textPrimary: '#1E293B',
      textSecondary: '#64748B',
      primary: '#3B82F6',
      accent: '#06B6D4',
      border: '#E2E8F0',
      inputBg: '#F1F5F9',
      hoverBg: '#F8FAFC',
      focusRing: '#3B82F6'
    }
  },
  blue: {
    name: 'Ocean Blue',
    colors: {
      background: '#0C4A6E',
      cardBg: '#0E7490',
      textPrimary: '#F0F9FF',
      textSecondary: '#BAE6FD',
      primary: '#0EA5E9',
      accent: '#38BDF8',
      border: '#0284C7',
      inputBg: '#0C4A6E',
      hoverBg: '#0E7490',
      focusRing: '#0EA5E9'
    }
  },
  green: {
    name: 'Forest Green',
    colors: {
      background: '#064E3B',
      cardBg: '#065F46',
      textPrimary: '#F0FDF4',
      textSecondary: '#BBF7D0',
      primary: '#10B981',
      accent: '#34D399',
      border: '#059669',
      inputBg: '#064E3B',
      hoverBg: '#065F46',
      focusRing: '#10B981'
    }
  },
  purple: {
    name: 'Royal Purple',
    colors: {
      background: '#581C87',
      cardBg: '#7C3AED',
      textPrimary: '#FAF5FF',
      textSecondary: '#DDD6FE',
      primary: '#8B5CF6',
      accent: '#A78BFA',
      border: '#6D28D9',
      inputBg: '#581C87',
      hoverBg: '#7C3AED',
      focusRing: '#8B5CF6'
    }
  },
  orange: {
    name: 'Sunset Orange',
    colors: {
      background: '#7C2D12',
      cardBg: '#C2410C',
      textPrimary: '#FFF7ED',
      textSecondary: '#FED7AA',
      primary: '#F97316',
      accent: '#FB923C',
      border: '#EA580C',
      inputBg: '#7C2D12',
      hoverBg: '#C2410C',
      focusRing: '#F97316'
    }
  },
  deepBlue: {
    name: 'Deep Blue & Subtle Grays',
    description: 'Classic and trustworthy, associated with professionalism and technology.',
    colors: {
      background: '#1A202C',
      cardBg: '#2D3748',
      textPrimary: '#E2E8F0',
      textSecondary: '#A0AEC0',
      primary: '#63B3ED',
      accent: '#48BB78',
      border: '#4A5568',
      inputBg: '#1A202C',
      hoverBg: '#2D3748',
      focusRing: '#63B3ED'
    }
  },
  warmGray: {
    name: 'Warm Grays & Muted Greens',
    description: 'Slightly warmer, more inviting feel while maintaining professionalism; can feel more techy and innovative.',
    colors: {
      background: '#1C1C1C',
      cardBg: '#2C2C2C',
      textPrimary: '#F0F0F0',
      textSecondary: '#B0B0B0',
      primary: '#F6AD55',
      accent: '#68D391',
      border: '#404040',
      inputBg: '#1C1C1C',
      hoverBg: '#2C2C2C',
      focusRing: '#F6AD55'
    }
  },
  modernTeal: {
    name: 'Modern Teal & Cool Grays',
    description: 'Leans into a more contemporary and sophisticated aesthetic, often found in design-focused applications.',
    colors: {
      background: '#171923',
      cardBg: '#2D3748',
      textPrimary: '#EDF2F7',
      textSecondary: '#A0AEC0',
      primary: '#38B2AC',
      accent: '#68D391',
      border: '#4A5568',
      inputBg: '#171923',
      hoverBg: '#2D3748',
      focusRing: '#38B2AC'
    }
  }
};

export const getThemeColors = (themeName: string): Theme['colors'] => {
  return themes[themeName]?.colors || themes.dark.colors;
}; 