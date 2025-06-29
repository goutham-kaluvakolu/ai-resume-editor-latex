import React from 'react';

interface ThemeAwareInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
}

const ThemeAwareInput: React.FC<ThemeAwareInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
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
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:border-transparent transition-all duration-200 text-sm"
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

export default ThemeAwareInput; 