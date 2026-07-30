import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import styles from './TripAdvisorReviews.module.css';

const TRIPADVISOR_URL =
  'https://www.tripadvisor.it/Restaurant_Review-g1186329-d12335425-Reviews-Vistamare-Rosignano_Solvay_Province_of_Livorno_Tuscany.html';

// Logo ufficiale TripAdvisor
const TRIPADVISOR_LOGO =
  'https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg';

// Recensioni reali prese dalla pagina TripAdvisor del ristorante.
const reviews = [
  {
    author: 'Armando G',
    date: 'maggio 2026',
    rating: 5,
    text: 'Io e mia moglie siamo stati a pranzo al Vistamare, siamo stati accolti con tanta gentilezza in una location stupenda e ben curata. Mangiato un pescato freschissimo e ben trattato. Ci ritorneremo sicuramente.'
  },
  {
    author: 'Vilu Vilu',
    date: 'settembre 2025',
    rating: 5,
    text: 'Sinceramente, non avevo mai mangiato così bene in questa zona: pesce freschissimo e piatti originali, preparati con grande cura e davvero deliziosi. Complimenti a tutto lo staff, dal servizio impeccabile allo chef. Anche la location merita una menzione speciale: accogliente e curata nei dettagli, contribuisce a rendere l’esperienza ancora più piacevole.'
  },
  {
    author: 'Alessandro B',
    date: 'luglio 2025',
    rating: 5,
    text: 'Ottimo posto, mangiare buonissimo, personale professionale e molto gentile, voto 10, prezzo onesto. Torneremo sicuramente.'
  },
  {
    author: 'Marco Ferraro',
    date: 'luglio 2025',
    rating: 5,
    text: 'Location stupenda, con vista mare… tavoli esterni posizionati in piccolo giardino ben curato e molto intimo… personale super preparato e accoglienza super… materie prime di alta qualità e cucinate alla perfezione…'
  },
  {
    author: 'michelle b',
    date: 'giugno 2025',
    rating: 5,
    text: 'Esperienza davvero piacevole sotto ogni aspetto. Il contesto è curato e accogliente, il servizio attento ma mai invadente. Ogni portata ha saputo sorprendere, con sapori ben bilanciati e presentazioni curate. Sicuramente un posto da ricordare e consigliare. Torneremo volentieri.'
  }
];

const AUTOPLAY_MS = 6000;

const Stars = ({ rating }) => (
  <div className={styles.stars} aria-label={`${rating} stelle su 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= rating ? styles.starFull : styles.starEmpty}>★</span>
    ))}
  </div>
);

const TripAdvisorReviews = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), []);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (isPaused) return undefined;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  const review = reviews[current];

  return (
    <section className={styles.tripAdvisorSection}>
      <div className={styles.tripAdvisorWrapper}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Le nostre recensioni</h2>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.taLogoLink}
            aria-label="Vistamare su TripAdvisor"
          >
            <img src={TRIPADVISOR_LOGO} alt="TripAdvisor" className={styles.taLogo} />
          </a>
        </div>

        <div className={styles.ratingRow}>
          <span className={styles.ratingValue}>4.0</span>
          <Stars rating={4} />
          <span className={styles.reviewCount}>400+ recensioni</span>
        </div>

        <div
          className={styles.slider}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className={styles.arrow} onClick={prev} aria-label="Recensione precedente">
            <BsArrowLeftShort />
          </button>

          <div className={styles.slideViewport}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={current}
                className={styles.reviewCard}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.quoteMark}>&ldquo;</span>
                <Stars rating={review.rating} />
                <blockquote className={styles.reviewText}>{review.text}</blockquote>
                <figcaption className={styles.reviewAuthor}>
                  {review.author} <span className={styles.reviewDate}>— {review.date}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <button className={styles.arrow} onClick={next} aria-label="Recensione successiva">
            <BsArrowRightShort />
          </button>
        </div>

        <div className={styles.dots}>
          {reviews.map((_, i) => (
            <button
              key={i}
              className={i === current ? styles.dotActive : styles.dot}
              onClick={() => setCurrent(i)}
              aria-label={`Vai alla recensione ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readReviewsLink}
          >
            Leggi le recensioni
          </a>
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.writeReviewBtn}
          >
            Scrivi una recensione
          </a>
        </div>
      </div>
    </section>
  );
};

export default TripAdvisorReviews;
