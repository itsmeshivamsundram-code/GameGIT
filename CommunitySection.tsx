import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 50000, suffix: 'K+', display: '50K+', label: 'Active Gamers' },
  { value: 5200, suffix: '+', display: '5,200+', label: 'Game Reviews' },
  { value: 120, suffix: '+', display: '120+', label: 'Weekly Articles' },
  { value: 4.9, suffix: '', display: '4.9', label: 'User Rating', isDecimal: true },
];

function AnimatedCounter({
  target,
  isDecimal,
  visible,
}: {
  target: number;
  isDecimal?: boolean;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) return;

    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      countRef.current = easeOut * target;

      if (isDecimal) {
        setCount(Number(countRef.current.toFixed(1)));
      } else {
        setCount(Math.floor(countRef.current));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (isDecimal) {
          setCount(target);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [visible, target, isDecimal]);

  if (!visible) return <span>0</span>;

  if (isDecimal) {
    return <span>{count.toFixed(1)}</span>;
  }

  if (target >= 1000) {
    return <span>{(count / 1000).toFixed(0)}K+</span>;
  }

  return <span>{count}{stats.find((s) => s.value === target)?.suffix || '+'}</span>;
}

export default function CommunitySection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setMessage('Please enter a valid email.');
      return;
    }
    setMessage('Thanks for subscribing! Check your inbox.');
    setEmail('');
  };

  return (
    <section id="community" className="bg-ink section-padding section-padding-mobile">
      <div className="container-custom text-center">
        {/* Section Header */}
        <h2
          className="reveal-heading text-bone font-bold uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.01em',
          }}
        >
          JOIN THE COMMUNITY
        </h2>
        <p className="reveal-subtext text-ash text-lg mt-2 max-w-[600px] mx-auto">
          Get weekly reviews, gaming news, and exclusive recommendations delivered to your inbox
        </p>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-12 md:mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="text-ember font-bold"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                <AnimatedCounter
                  target={stat.value}
                  isDecimal={stat.isDecimal}
                  visible={statsVisible}
                />
              </span>
              <span className="text-ash text-xs tracking-[0.08em] uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="reveal-stagger mt-12 md:mt-16 max-w-[520px] mx-auto">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-0"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage('');
              }}
              className="flex-1 h-14 px-5 bg-void text-bone placeholder:text-ash/50 outline-none transition-all duration-200 focus:border-ember rounded-xl sm:rounded-r-none sm:rounded-l-xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button
              type="submit"
              className="h-14 px-7 bg-ember text-bone text-sm font-semibold tracking-[0.06em] uppercase transition-all duration-300 hover:bg-ember-deep rounded-xl sm:rounded-l-none sm:rounded-r-xl mt-2 sm:mt-0"
            >
              SUBSCRIBE
            </button>
          </form>
          {message && (
            <p
              className={`mt-3 text-sm ${
                message.includes('Thanks') ? 'text-gold' : 'text-ember'
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Trust Badges */}
        <div className="reveal-stagger flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              ),
              label: 'Expert Critics',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              label: 'Updated Daily',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFB800" stroke="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
              label: 'Gamer Loved',
            },
          ].map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2">
              {badge.icon}
              <span className="text-ash text-base">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
