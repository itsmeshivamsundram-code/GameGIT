import GameReviewCard from './GameReviewCard';

const topGames = [
  {
    image: '/assets/elden-ring.jpg',
    title: "Elden Ring: Shadow of the Erdtree",
    platform: 'PS5',
    genre: 'Action RPG',
    score: '9.8',
    rating: 5,
    quote: 'A masterclass in world design that redefines what an expansion can achieve.',
  },
  {
    image: '/assets/baldurs-gate.jpg',
    title: "Baldur's Gate 3",
    platform: 'PC',
    genre: 'RPG',
    score: '9.7',
    rating: 5,
    quote: 'The new gold standard for role-playing games — near limitless player freedom.',
  },
  {
    image: '/assets/zelda-totk.jpg',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'SWITCH',
    genre: 'Adventure',
    score: '9.6',
    rating: 5,
    quote: "Nintendo's magnum opus — a playground of pure creative possibility.",
  },
];

export default function TopRatedSection() {
  return (
    <section id="top-rated" className="bg-void section-padding section-padding-mobile">
      <div className="container-custom">
        {/* Section Header */}
        <h2
          className="reveal-heading text-bone font-bold uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.01em',
          }}
        >
          TOP RATED GAMES
        </h2>
        <p className="reveal-subtext text-ash text-lg mt-2">
          The highest-scored titles of 2025, handpicked by our critics
        </p>

        {/* Top Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {topGames.map((game, i) => (
            <GameReviewCard
              key={game.title}
              {...game}
              mode="landscape"
              index={i}
            />
          ))}
        </div>

        {/* View All Rankings Button */}
        <div className="reveal-stagger flex justify-center mt-12">
          <button
            className="px-8 py-3.5 rounded-full bg-ember text-bone text-sm font-semibold tracking-[0.06em] uppercase transition-all duration-300 hover:bg-ember-deep hover:-translate-y-0.5"
            style={{ boxShadow: '0 0 30px rgba(255, 59, 48, 0.15)' }}
          >
            SEE FULL RANKINGS
          </button>
        </div>
      </div>
    </section>
  );
}
