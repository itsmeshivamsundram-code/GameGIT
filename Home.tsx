import { useState } from 'react';
import NavigationBar from '../sections/NavigationBar';
import LoginModal from '../sections/LoginModal';
import HeroSection from '../sections/HeroSection';
import LatestReviewsSection from '../sections/LatestReviewsSection';
import PlatformsSection from '../sections/PlatformsSection';
import TopRatedSection from '../sections/TopRatedSection';
import CommunitySection from '../sections/CommunitySection';
import Footer from '../sections/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useScrollReveal();

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  return (
    <>
      <NavigationBar
        onLoginClick={() => setLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
      <main>
        <HeroSection />
        <LatestReviewsSection />
        <PlatformsSection />
        <TopRatedSection />
        <CommunitySection />
      </main>
      <Footer />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
