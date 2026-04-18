import { useEffect } from 'react';

export function useScrollReveal(threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const hiddenElements = document.querySelectorAll(
      '.reveal-hidden, .reveal-heading, .reveal-subtext, .reveal-stagger'
    );
    hiddenElements.forEach((el) => observer.observe(el));

    // Also observe score badges
    const scoreBadges = document.querySelectorAll('.score-badge-pop');
    scoreBadges.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}
