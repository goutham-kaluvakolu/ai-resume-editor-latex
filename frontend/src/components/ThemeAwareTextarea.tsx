import React from 'react';

interface ThemeAwareTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

const ThemeAwareTextarea: React.FC<ThemeAwareTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  className = ""
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        className="block text-sm font-medium"
        style={{ color: 'var(--theme-text-primary)' }}
      >
        {label}
        {required && <span style={{ color: 'var(--theme-accent)' }}> *</span>}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent transition-all duration-200 text-sm resize-none"
        style={{
          backgroundColor: 'var(--theme-input-bg)',
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text-primary)',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          '--tw-ring-color': 'var(--theme-focus-ring)'
        } as React.CSSProperties}
      />
    </div>
  );
};

export default ThemeAwareTextarea; 