import React from 'react';

interface AuthFormToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

export function AuthFormToggle({ isLogin, onToggle }: AuthFormToggleProps) {
  return (
    <p className="mt-4 text-center text-gray-400">
      {isLogin ? "Don't have an account? " : "Already have an account? "}
      <button
        onClick={onToggle}
        type="button"
        className="text-blue-400 hover:text-blue-300"
      >
        {isLogin ? 'Sign Up' : 'Sign In'}
      </button>
    </p>
  );
}