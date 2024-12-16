import React from 'react';

interface AuthFormInputProps {
  type: 'email' | 'password';
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function AuthFormInput({ type, label, value, onChange }: AuthFormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
    </div>
  );
}