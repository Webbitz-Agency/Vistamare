import React, { useState, useEffect } from 'react';
import styles from './PhilosophySection.module.css';
import ScrollReveal from './ScrollReveal';

// Immagini referenziate direttamente nel JSX

const PhilosophySection = () => {
  const images = ['/assets/filosofia1.webp', '/assets/filosofia2.webp', '/assets/filosofia3.webp', '/assets/filosofia4.webp'];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.philosophy}>
      <div className={styles.imagePart}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
          >
            <img 
              src={image} 
              alt={`Filosofia ${index + 1}`} 
              className={styles.slideImage} 
            />
          </div>
        ))}
        <button 
          className={styles.prevButton} 
          onClick={prevSlide}
          aria-label="Immagine precedente"
        >
          <span className={styles.arrow}>←</span>
        </button>
        <button 
          className={styles.nextButton} 
          onClick={nextSlide}
          aria-label="Immagine successiva"
        >
          <span className={styles.arrow}>→</span>
        </button>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === current ? styles.active : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Vai all'immagine ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.textPart}>
        <div className={styles.box}>
          <h2 style={{ fontStyle: 'roboto sans-serif', textTransform: 'uppercase', paddingBottom: '0rem', lineHeight: '0.3'  }}>la nostra</h2>
          <h1 className={styles.filosofiaTitle}>filosofia</h1>
          <ScrollReveal delay={150}>
            <p>Scegliamo ingredienti <span className={styles.highlight}>locali</span> e <span className={styles.highlight}>biologici</span>, 
              sostenendo i piccoli produttori del territorio e proponendo un menu che a ogni <span className={styles.highlight}>stagione</span> unisce il rispetto per la tradizione marinara e il desiderio di portarla nel futuro.</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection; 