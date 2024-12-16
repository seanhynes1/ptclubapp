import React from 'react';
import { Loader2, LogIn, UserPlus } from 'lucide-react';

interface AuthFormButtonProps {
  loading: boolean;
  isLogin: boolean;
}

export function AuthFormButton({ loading, isLogin }: AuthFormButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : isLogin ? (
        <>
          <LogIn className="h-5 w-5" />
          <span>Sign In</span>
        </>
      ) : (
        <>
          <UserPlus className="h-5 w-5" />
          <span>Sign Up</span>
        </>
      )}
    </button>
  );
}