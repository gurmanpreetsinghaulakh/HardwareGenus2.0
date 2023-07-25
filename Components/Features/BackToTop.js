"use client"

import { AiOutlineCaretUp } from 'react-icons/ai'

import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`backToTop ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
    <AiOutlineCaretUp/>
    </div>
  );
};

export default BackToTop;
