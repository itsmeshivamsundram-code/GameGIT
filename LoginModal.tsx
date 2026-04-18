import { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onLogin(email.split('@')[0] || 'Gamer');
    setEmail('');
    setPassword('');
    onClose();
  };

  const handleGuest = () => {
    setError('');
    onLogin('Gamer');
    setEmail('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className={`relative w-[90%] max-w-[420px] p-8 rounded-[20px] transition-all duration-300 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          background: '#141414',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ash hover:text-bone transition-colors p-2"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-bone text-center font-bold text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.01em] uppercase">
          Welcome Back
        </h2>
        <p className="text-ash text-center mt-2 text-base">
          Log in to save your favorite reviews
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="w-full h-[52px] px-4 rounded-xl bg-void text-bone placeholder:text-ash/50 outline-none transition-all duration-200 focus:border-ember"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="w-full h-[52px] px-4 rounded-xl bg-void text-bone placeholder:text-ash/50 outline-none transition-all duration-200 focus:border-ember"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          />

          {error && <p className="text-ember text-sm mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full h-14 rounded-full bg-ember text-bone text-sm font-semibold tracking-[0.06em] uppercase transition-all duration-300 hover:bg-ember-deep hover:-translate-y-0.5 mt-2"
            style={{ boxShadow: '0 0 30px rgba(255, 59, 48, 0.15)' }}
          >
            LOG IN
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-ash text-xs tracking-[0.08em] uppercase">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Guest Button */}
        <button
          onClick={handleGuest}
          className="w-full h-14 rounded-full bg-transparent text-bone text-sm font-semibold tracking-[0.06em] uppercase transition-all duration-300 border hover:bg-white/5"
          style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          CONTINUE AS GUEST
        </button>

        {/* Bottom Text */}
        <p className="text-center mt-6 text-sm text-ash">
          Don&apos;t have an account?{' '}
          <span className="text-ember cursor-pointer hover:underline">Sign Up</span>
        </p>
      </div>
    </div>
  );
}
