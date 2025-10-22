import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Mail, Lock, User, Chrome, Github, Apple } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        email,
        name: name || email.split('@')[0],
        id: Math.random().toString(36).substr(2, 9),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      toast.success(`${mode === 'signin' ? 'Signed in' : 'Signed up'} successfully!`);
      onAuthSuccess(user);
      onClose();
      setLoading(false);
      
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);

    // Simulate OAuth flow
    setTimeout(() => {
      const user = {
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        id: Math.random().toString(36).substr(2, 9),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        provider,
      };

      toast.success(`Signed in with ${provider}!`);
      onAuthSuccess(user);
      onClose();
      setLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === 'signin'
              ? 'Sign in to access your ParkStay Pass account'
              : 'Sign up to start your journey with ParkStay Pass'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Social Auth Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => handleSocialAuth('google')}
              disabled={loading}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              <Chrome className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>

            <Button
              onClick={() => handleSocialAuth('github')}
              disabled={loading}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              <Github className="w-4 h-4 mr-2" />
              Continue with GitHub
            </Button>

            <Button
              onClick={() => handleSocialAuth('apple')}
              disabled={loading}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              <Apple className="w-4 h-4 mr-2" />
              Continue with Apple
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-slate-800" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-slate-500 text-sm">
              or
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={mode === 'signup'}
                    disabled={loading}
                    className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading
                ? 'Please wait...'
                : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center text-sm">
            <span className="text-slate-400">
              {mode === 'signin'
                ? "Don't have an account? "
                : 'Already have an account? '}
            </span>
            <Button
              type="button"
              variant="link"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-purple-400 hover:text-purple-300 p-0 h-auto"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
