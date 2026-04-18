import { useState } from 'react';
import GameReviewCard from './GameReviewCard';

const reviews = [
  {
    image: '/assets/cyber-odyssey.jpg',
    title: 'Cyber Odyssey 2077',
    platform: 'PC',
    genre: 'Action RPG',
    rating: 5,
    score: '9.5',
  },
  {
    image: '/assets/legends-arena.jpg',
    title: 'Legends Arena',
    platform: 'MOBILE',
    genre: 'Battle Royale',
    rating: 4,
    score: '8.0',
  },
  {
    image: '/assets/shadow-realms.jpg',
    title: 'Shadow Realms',
    platform: 'PS5',
    genre: 'Soulslike',
    rating: 5,
    score: '9.8',
  },
  {
    image: '/assets/velocity-x.jpg',
    title: 'Velocity X',
    platform: 'XBOX',
    genre: 'Racing',
    rating: 4,
    score: '7.5',
  },
  {
    image: '/assets/mystic-chronicles.jpg',
    title: 'Mystic Chronicles',
    platform: 'SWITCH',
    genre: 'JRPG',
    rating: 4,
    score: '8.5',
  },
  {
    image: '/assets/tactical-ops.jpg',
    title: 'Tactical Ops',
    platform: 'PC',
    genre: 'FPS',
    rating: 3,
    score: '7.0',
  },
];

const filters = ['ALL', 'PC', 'CONSOLE', 'MOBILE'];

export default function LatestReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'CONSOLE') return ['PS5', 'XBOX', 'SWITCH'].includes(r.platform);
    return r.platform === activeFilter;
  });

  return (
    <section
      id="reviews"
      className="bg-void section-padding section-padding-mobile"
    >
      <div className="container-custom">
        {/* Section Header */}
        <h2
          className="reveal-heading text-bone font-bold uppercase"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.01em',
          }}
        >
          LATEST REVIEWS
        </h2>
        <p className="reveal-subtext text-ash text-lg mt-2">
          Fresh takes on the newest releases across every platform
        </p>

        {/* Filter Tabs */}
        <div className="reveal-subtext flex flex-wrap gap-2 mt-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-[0.05em] uppercase transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-ember text-bone'
                  : 'bg-transparent text-ash border hover:text-bone hover:border-white/30'
              }`}
              style={
                activeFilter !== filter
                  ? { borderColor: 'rgba(255,255,255,0.15)' }
                  : {}
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredReviews.map((review, i) => (
            <div
              key={review.title}
              className={`transition-all duration-300 ${
                activeFilter !== 'ALL' && !filteredReviews.includes(review)
                  ? 'hidden'
                  : 'block'
              }`}
            >
              <GameReviewCard {...review} mode="portrait" index={i} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="reveal-stagger flex justify-center mt-12">
          <button
            className="px-8 py-3.5 rounded-full bg-transparent text-bone text-sm font-semibold tracking-[0.06em] uppercase border transition-all duration-300 hover:bg-white/5"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            VIEW ALL REVIEWS
          </button>
        </div>
      </div>
    </section>
  );
}
