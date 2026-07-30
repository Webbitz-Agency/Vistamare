// PrenotaOraButton.jsx — bottone flottante presente su tutte le pagine (montato in _app).
// Sulla home scrolla al form di prenotazione; sulle altre pagine porta al form della home.
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './PrenotaOraButton.module.css';

const PrenotaOraButton = () => {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setVisible(true);
    const form = document.getElementById('reservation-form');
    const footer = document.querySelector('footer');
    const targets = [form, footer].filter(Boolean);
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Il bottone si nasconde quando form o footer sono visibili
        const shouldHide = entries.some((entry) => entry.isIntersecting);
        setVisible(!shouldHide);
      },
      { root: null, threshold: 0.5 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [router.asPath]);

  const handleClick = () => {
    const form = document.getElementById('reservation-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#reservation-form');
    }
  };

  return (
    <button
      className={`${styles.prenotaButton} ${!visible ? styles.hidden : ''}`}
      onClick={handleClick}
    >
      <i className="fa-regular fa-calendar-check" style={{ marginRight: '10px' }}></i> Prenota ora!
    </button>
  );
};

export default PrenotaOraButton;
