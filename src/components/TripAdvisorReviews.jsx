import React, { useEffect, useState } from 'react';
import styles from './TripAdvisorReviews.module.css';

// Componente per mostrare il widget recensioni di TripAdvisor
const TripAdvisorReviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Funzione per caricare lo script di TripAdvisor
    const loadTripAdvisorWidget = () => {
      // Rimuovere gli script precedenti se esistono
      const existingScript = document.getElementById('tripadvisor-script');
      if (existingScript) {
        existingScript.remove();
      }
      
      try {
        // Creare un nuovo elemento script
        const script = document.createElement('script');
        script.id = 'tripadvisor-script';
        // Usare un widget di tipo diverso che si carica più facilmente
        script.src = 'https://www.jscache.com/wejs?wtype=certificateOfExcellence&uniq=123&locationId=12335425&lang=it_IT&year=2022&display_version=2';
        script.async = true;
        
        // Gestione del caricamento
        script.onload = () => {
          setIsLoading(false);
        };
        
        // Gestione dell'errore
        script.onerror = () => {
          console.error('Errore nel caricamento del widget TripAdvisor');
          setIsLoading(false);
          
          // Fallback su un widget più semplice
          setTimeout(() => {
            try {
              const fallbackScript = document.createElement('script');
              fallbackScript.id = 'tripadvisor-fallback-script';
              fallbackScript.src = 'https://www.jscache.com/wejs?wtype=socialButtonIcon&uniq=456&locationId=12335425&color=green&size=med&lang=it_IT';
              fallbackScript.async = true;
              
              const container = document.getElementById('TA_socialButtonIcon');
              if (container) {
                container.appendChild(fallbackScript);
              }
            } catch (fallbackError) {
              console.error('Errore nel caricamento del widget fallback', fallbackError);
            }
          }, 1000);
        };
        
        // Aggiungere lo script al container
        const container = document.getElementById('TA_certificateOfExcellence');
        if (container) {
          container.appendChild(script);
        }
      } catch (error) {
        console.error('Errore nell\'inizializzazione del widget', error);
        setIsLoading(false);
      }
    };
    
    // Caricare lo script di TripAdvisor dopo il rendering del componente
    loadTripAdvisorWidget();
    
    // Ripulire quando il componente viene smontato
    return () => {
      const script = document.getElementById('tripadvisor-script');
      if (script) {
        script.remove();
      }
      const fallbackScript = document.getElementById('tripadvisor-fallback-script');
      if (fallbackScript) {
        fallbackScript.remove();
      }
    };
  }, []);
  
  // URL diretto del logo TripAdvisor
  const tripAdvisorLogoUrl = "https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg";
  
  return (
    <section className={styles.tripAdvisorSection}>
      <div className={styles.tripAdvisorWrapper}>
        <div className={styles.tripAdvisorHeader}>
          <h3 className={styles.sectionTitle}>LE NOSTRE RECENSIONI</h3>
          <div className={styles.taLogo}>
            <img 
              src={tripAdvisorLogoUrl} 
              alt="TripAdvisor Logo" 
            />
          </div>
        </div>
        
        <div className={styles.widgetWrapper}>
          {/* Contenitore principale per il widget */}
          <div id="TA_certificateOfExcellence" className={styles.taWidget}>
            {isLoading && (
              <div className={styles.placeholderBox}>
                <div className={styles.loading}>Caricamento recensioni...</div>
              </div>
            )}
          </div>
          
          {/* Container fallback */}
          <div id="TA_socialButtonIcon" className={styles.taFallbackWidget}></div>
          
          {/* Link diretto alle recensioni */}
          <div className={styles.reviewsLinkBox}>
            <div className={styles.starsRow}>
              <span className={styles.ratingText}>4.0</span>
              <div className={styles.stars}>
                <span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className={styles.reviewCount}>400+ recensioni</span>
            </div>
            <a 
              href="https://www.tripadvisor.it/Restaurant_Review-g1186329-d12335425-Reviews-Vistamare-Rosignano_Solvay_Province_of_Livorno_Tuscany.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.viewReviewsLink}
            >
              LEGGI LE RECENSIONI
            </a>
          </div>
        </div>
        
        <div className={styles.reviewLinkContainer}>
          <a 
            href="https://www.tripadvisor.it/Restaurant_Review-g1186329-d12335425-Reviews-Vistamare-Rosignano_Solvay_Province_of_Livorno_Tuscany.html" 
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
