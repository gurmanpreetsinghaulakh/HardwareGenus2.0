"use client"
import React, { useEffect, useState } from 'react';


const Subscribe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name.trim() !== '' && email.trim() !== '') {
      // Assuming you have some logic to handle form submission, e.g., API call
      // For this example, let's just set the state to simulate a successful subscription
      setIsSubscribed(true);
    }
  };

  useEffect(() => {
    if (isSubscribed) {
      setTimeout(() => {
        setIsSubscribed(false);
        setName('');
        setEmail('');
        window.location.href = '/'; // Replace '/homepage' with your actual homepage URL
      }, 2000); // Redirect after 1 second (1000 milliseconds)
    }
  }, [isSubscribed]);

  return (
    <>
      <header id="home" className="section">
        <div className="overlay" />
        {!isSubscribed ? (
          <div className="content">
            <h1>Newsletter</h1>
            <p>
              Subscribe to our newsletter to receive valuable content, exclusive
              offers, and more!
            </p>

            <form
              action="#"
              method="POST"
              className="main-newsletter-input"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        ) : (
          <div className="success-message">
            <p>You have successfully subscribed, {name}!</p>
          </div>
        )}
      </header>
    </>
  );
};

export default Subscribe;
