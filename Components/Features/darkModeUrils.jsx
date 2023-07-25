// Function to create a custom event for dark mode toggle
const createDarkModeToggleEvent = (isDarkMode) => {
    let darkModeToggleEvent;
  
    // Check if CustomEvent is supported in the environment
    if (typeof window !== 'undefined' && typeof window.CustomEvent === 'function') {
      darkModeToggleEvent = new CustomEvent('darkModeToggle', { detail: { isDarkMode } });
    } else {
      darkModeToggleEvent = document.createEvent('CustomEvent');
      darkModeToggleEvent.initCustomEvent('darkModeToggle', true, true, { isDarkMode });
    }
  
    return darkModeToggleEvent;
  };
  
  // Function to dispatch the dark mode toggle event
  const dispatchDarkModeToggle = (isDarkMode) => {
    const darkModeToggleEvent = createDarkModeToggleEvent(isDarkMode);
    window.dispatchEvent(darkModeToggleEvent);
  };
  
  export default dispatchDarkModeToggle;
  

