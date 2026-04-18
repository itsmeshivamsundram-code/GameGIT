const platforms = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    name: 'PC GAMES',
    description: 'From indie gems to AAA blockbusters, find the best PC games reviewed by our team.',
    stat: '2,400+ Reviews',
    cta: 'BROWSE PC',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="14" y1="12" x2="18" y2="12" />
        <line x1="8" y1="8" x2="8" y2="8" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="8" x2="16" y2="8" strokeWidth="3" strokeLinecap="round" />
        <path d="M2 8.5A5.5 5.5 0 0 1 7.5 3h9A5.5 5.5 0 0 1 22 8.5v7a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 15.5v-7z" />
      </svg>
    ),
    name: 'CONSOLE',
    description: 'PlayStation, Xbox, Nintendo Switch — honest reviews for every console gamer.',
    stat: '1,800+ Reviews',
    cta: 'BROWSE CONSOLE',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    name: 'MOBILE GAMES',
    description: 'The best iOS and Android games, from casual puzzles to competitive esports titles.',
    stat: '950+ Reviews',
    cta: 'BROWSE MOBILE',
  },
];

const genres = [
  'ACTION',
  'RPG',
  'FPS',
  'RACING',
  'STRATEGY',
  'SPORTS',
  'PUZZLE',
  'HORROR',
  'SIMULATION',
  'ADVENTURE',
];

export default function PlatformsSection() {
  return (
    <section id="platforms" className="bg-ink section-padding section-padding-mobile">
      <div className="container-custom">
        {/* Section Header */}
        <h2
          className="reveal-heading text-bone font-bold uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.01em',
          }}
        >
          CHOOSE YOUR PLATFORM
        </h2>
        <p className="reveal-subtext text-ash text-lg mt-2">
          We&apos;ve got reviews for every way you play
        </p>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {platforms.map((platform, i) => (
            <div
              key={platform.name}
              className="reveal-stagger flex flex-col items-center text-center p-8 md:p-10 rounded-[20px] bg-void border transition-all duration-300 hover:border-ember/30 hover:shadow-glow"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.06)',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {platform.icon}
              <h3 className="text-bone font-semibold text-xl mt-4">{platform.name}</h3>
              <p className="text-ash text-base mt-2 max-w-[280px] leading-relaxed">
                {platform.description}
              </p>
              <span className="text-ember text-xs font-medium tracking-[0.08em] uppercase mt-6">
                {platform.stat}
              </span>
              <button
                className="mt-6 px-8 py-3 rounded-full bg-transparent text-bone text-sm font-semibold tracking-[0.06em] uppercase border transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                {platform.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Divider with Label */}
        <div className="reveal-subtext relative flex items-center mt-16 md:mt-20">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="px-4 text-ash text-xs tracking-[0.08em] uppercase bg-ink">
            OR SEARCH BY GENRE
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Genre Tags */}
        <div className="reveal-subtext flex flex-wrap justify-center gap-2 mt-6">
          {genres.map((genre) => (
            <span
              key={genre}
              className="px-4 py-2 rounded-full bg-surface text-ash text-[0.8125rem] font-medium cursor-default transition-all duration-200 hover:bg-ember/10 hover:text-bone"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
