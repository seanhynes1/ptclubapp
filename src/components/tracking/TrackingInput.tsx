import React from 'react';

interface TrackingInputProps {
  type: 'text' | 'number' | 'textarea';
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  step?: string;
}

export function TrackingInput({ 
  type,
  label,
  value,
  onChange,
  required,
  step
}: TrackingInputProps) {
  const baseClassName = "w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClassName}
          rows={3}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClassName}
          required={required}
          step={step}
        />
      )}
    </div>
  );
}