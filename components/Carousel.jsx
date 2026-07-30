import React, { useState, useEffect, useCallback } from 'react';
import styles from './Carousel.module.css';

function Carousel() {
  // Immagini per il carosello
  const sliderImages = [
    '/assets/2.webp',
    '/assets/18.webp',
    '/assets/19.webp',
    '/assets/15.webp',
    '/assets/16.webp'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Funzione per passare al prossimo slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((currentSlide + 1) % sliderImages.length);
  }, [currentSlide, sliderImages.length]);

  // Funzione per passare al slide precedente
  const prevSlide = useCallback(() => {
    setCurrentSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length);
  }, [currentSlide, sliderImages.length]);

  // Auto-avanzamento per il carosello
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Gestione delle scorciatoie da tastiera
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Gestione degli eventi touch
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Se lo swipe è sufficientemente lungo, cambia slide
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setTouchStartX(null);
  };

  return (
    <div className={styles.carouselContainer}>
      <div 
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              className={styles.slideImage} 
            />
          </div>
        ))}
        
        {/* Overlay con logo e testo */}
        <div className={styles.overlay}>
         {/* <img 
            src="/assets/logo.png" 
            alt="Vistamare Logo" 
            className={styles.logo} 
          />*/}
          <h1 style={{textTransform: 'uppercase'}} className={styles.title}>Vistamare</h1>
          <h3 style={{
            color: 'var(--white)', 
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: 'clamp(18px, 5vw, 35px)',
            fontWeight: 'bold',
            letterSpacing: 'clamp(2px, 1vw, 10px)'
          }}>RISTORANTE</h3>
        </div>
        
        {/* Pulsanti di navigazione */}
        {/*<button 
          className={styles.prevButton} 
          onClick={prevSlide}
          aria-label="Slide precedente"
        >
          <span className={styles.arrow}>←</span>
        </button>
        <button 
          className={styles.nextButton} 
          onClick={nextSlide}
          aria-label="Slide successivo"
        >
          <span className={styles.arrow}>→</span>
        </button>*/}
        
        <div className={styles.dots}>
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Vai allo slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel; 