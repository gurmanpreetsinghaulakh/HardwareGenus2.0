'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ToggleNav from './ToggleNav';
import dispatchDarkModeToggle from './Features/darkModeUrils';
import SearchNavbar from './Features/SearchNavbar';




const TopNavbar = () => {


  // State to manage the visibility of the ToggleNav, initialize to true
  const [isToggleNavOpen, setIsToggleNavOpen] = useState(true);

  const [isToggleSearchOpen, setIsToggleSearchOpen] = useState(false);

  // State to manage the dark mode, initialize to true (dark mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the visibility of the ToggleNav
  const handleToggleNavClick = () => {
    setIsToggleNavOpen((prev) => !prev);
  };

  const handleToggleSearchClick = () => {
    setIsToggleSearchOpen((prev) => !prev);
  };

  // Function to toggle dark mode on sun/moon icon click
  const handleDarkModeClick = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    // Dispatch the custom event with the new dark mode value
    dispatchDarkModeToggle(newDarkMode);
  };

  useEffect(() => {
    // Apply dark mode styles to the body when dark mode is enabled
    if (isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Add event listener to the scroll event
    const handleScroll = () => {
      // Check if the scroll position is less than 20 (near the top) on mobile devices
      const isMobile = window.innerWidth <= 768; // Adjust this width according to your mobile device needs
      const scrollThreshold = isMobile ? 20 : 20;

      if (window.scrollY < scrollThreshold) {
        setIsToggleNavOpen(true);
      } else {
        setIsToggleNavOpen(false);
      }

      if (window.scrollY < scrollThreshold) {
        setIsToggleSearchOpen(false);
      } else {
        setIsToggleSearchOpen(false);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const handleProfileClick = () => {
    window.open('/User/newsletter', '_blank');
  };


  return (
    <>
      <div className="top-nav">
        <nav>
          <div className="left">
            {/* Add event handler to toggle the visibility of ToggleNav */}
            <img
              id="toggle-menu"
              src={isDarkMode ? '/pepicons-pencil_menulight.png' : '/Menu.png'}
              alt="menu button"
              width={24}
              onClick={handleToggleNavClick}
            />
            {/* Add event handler to toggle dark mode */}
            <img
              id="darkModeBtn"
              src={isDarkMode ? '/ph_moon-filllight.png' : '/sun.png'}
              alt="darkmode button"
              width={24}
              onClick={handleDarkModeClick}
            />
          </div>
          <Link href="/" aria-label="Link to Homepage">
            {" "}
            <div className="logo">
              <img id="logo" src={isDarkMode ? '/BigdarkLogo.png' : '/Logo.png'} alt="mainlogo" />
            </div>
          </Link>
          <div className="right">
            <img id="search-button" src={isDarkMode ? '/ri_search-linelight.png' : '/Search.png'} alt="search button" width={24}
              onClick={handleToggleSearchClick}
            />
            
            <img
              id="profile-button"
              onClick={handleProfileClick}
              src={isDarkMode ? '/healthicons_ui-user-profilelight.png' : '/Profile.png'}
              alt="profile button"
              width={24}
            />
          </div>
        </nav>
      </div>
      <div className="underline" />

      {isToggleSearchOpen && <SearchNavbar />}

      {/* Render ToggleNav based on the state with the CSS className for transition */}
      {isToggleNavOpen && <ToggleNav className="toggle-nav" />}

    </>
  );
};

export default TopNavbar;
