import React, { useState } from 'react';
import { signIn, signUp } from '../../services/auth';
import { Logo } from '../common/Logo';
import { AuthFormInput } from './AuthFormInput';
import { AuthFormButton } from './AuthFormButton';
import { AuthFormToggle } from './AuthFormToggle';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <p className="mt-4 text-gray-400 text-center max-w-sm">
          Track your fitness journey and achieve your goals with personalized progress tracking
        </p>
      </div>

      <div className="p-8 rounded-lg bg-gradient-to-br from-gray-900 to-blue-900 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthFormInput
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
          />
          
          <AuthFormInput
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
          />

          <AuthFormButton
            loading={loading}
            isLogin={isLogin}
          />

          <AuthFormToggle
            isLogin={isLogin}
            onToggle={() => setIsLogin(!isLogin)}
          />
        </form>
      </div>
    </div>
  );
}