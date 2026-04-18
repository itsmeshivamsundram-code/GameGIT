import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 40 : 80;
    const COLORS = ['#FF3B30', '#FF6B35', '#FFB800'];

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2 };

    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedY: -(Math.random() * 0.5 + 0.3),
        opacity: Math.random() * 0.6 + 0.2,
        opacitySpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseOffsetX = ((mouse.x - width / 2) / width) * -15;
      const mouseOffsetY = ((mouse.y - height / 2) / height) * -15;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        if (p.opacity > 0.8 || p.opacity < 0.2) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const drawX = p.x + mouseOffsetX;
        const drawY = p.y + mouseOffsetY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0A0A0A', zIndex: 1 }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[800px] px-4">
        <h1
          className={`text-bone font-extrabold uppercase transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            transitionDelay: '200ms',
          }}
        >
          WHERE EVERY GAME GETS ITS VERDICT
        </h1>

        <p
          className={`text-ash text-lg md:text-xl mt-6 md:mt-8 tracking-[0.01em] max-w-[600px] transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Read honest reviews for PC, Console &amp; Mobile games. Find your next obsession.
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 mt-8 md:mt-12 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <a
            href="#reviews"
            onClick={(e) => handleScrollTo(e, '#reviews')}
            className="px-8 py-3.5 rounded-full bg-ember text-bone text-sm font-semibold tracking-[0.06em] uppercase transition-all duration-300 hover:bg-ember-deep hover:-translate-y-0.5"
            style={{ boxShadow: '0 0 30px rgba(255, 59, 48, 0.15)' }}
          >
            EXPLORE REVIEWS
          </a>
          <a
            href="#community"
            onClick={(e) => handleScrollTo(e, '#community')}
            className="px-8 py-3.5 rounded-full bg-transparent text-bone text-sm font-semibold tracking-[0.06em] uppercase border transition-all duration-300 hover:bg-white/5"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            JOIN THE COMMUNITY
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <svg
          className="animate-scroll-pulse text-ash"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className="text-ash text-xs tracking-[0.08em] uppercase">Scroll to explore</span>
      </div>
    </section>
  );
}
