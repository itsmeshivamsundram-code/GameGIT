interface GameReviewCardProps {
  image: string;
  title: string;
  platform: string;
  genre: string;
  rating: number;
  score: string;
  mode: 'portrait' | 'landscape';
  quote?: string;
  index?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? '#FFB800' : 'rgba(255,255,255,0.15)'}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function GameReviewCard({
  image,
  title,
  platform,
  genre,
  rating,
  score,
  mode,
  quote,
  index = 0,
}: GameReviewCardProps) {

  if (mode === 'portrait') {
    return (
      <div
        className="reveal-stagger group bg-ink rounded-2xl overflow-hidden shadow-card transition-all duration-[400ms] hover:-translate-y-2 hover:shadow-elevated"
        style={{
          transitionDelay: `${index * 0.08}s`,
          aspectRatio: '3/4',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ flex: '0 0 55%' }}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl m-2 mb-0 transition-transform duration-[600ms] ease-out group-hover:scale-105"
            style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 8px)' }}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <span className="text-ash text-xs font-medium tracking-[0.08em] uppercase">
            {platform}
          </span>
          <h3 className="text-bone font-semibold text-xl mt-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          <span className="text-ash text-xs font-medium tracking-[0.08em] uppercase mt-2">
            {genre}
          </span>
          <div className="flex items-center justify-between mt-auto pt-3">
            <StarRating rating={rating} />
            <span className="text-ember font-bold text-2xl">{score}</span>
          </div>
        </div>
      </div>
    );
  }

  // Landscape mode (Top Rated)
  return (
    <div
      className="reveal-stagger group relative bg-ink rounded-[20px] overflow-hidden shadow-card transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-elevated"
      style={{
        transitionDelay: `${index * 0.15}s`,
        transformOrigin: 'center',
      }}
      onTransitionEnd={() => {
        const el = document.querySelector(`.score-badge-${index}`);
        if (el) el.classList.add('pop-visible');
      }}
    >
      {/* Score Badge */}
      <div
        className={`score-badge-pop absolute top-4 right-4 w-14 h-14 rounded-full bg-ember text-bone font-bold text-xl flex items-center justify-center z-20`}
        style={{ boxShadow: '0 4px 16px rgba(255,59,48,0.4)' }}
      >
        {score}
      </div>

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '60%' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-2xl m-2.5 mb-0 transition-transform duration-[600ms] ease-out group-hover:scale-105"
          style={{ width: 'calc(100% - 20px)', height: 'calc(100% - 10px)' }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-bone font-semibold text-[1.375rem] leading-tight">{title}</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ember/15 text-ember">
            {platform}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface text-ash">
            {genre}
          </span>
        </div>
        {quote && (
          <p className="text-ash text-[0.9375rem] italic mt-3 line-clamp-2 leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
