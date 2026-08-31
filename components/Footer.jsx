import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { FaInstagram, FaFacebook, FaTripadvisor, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // URL corretto per l'incorporamento della mappa
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.7121614892244!2d10.428314!3d43.388432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d5e357a60fbbcd%3A0xa1c276a0d7e382d8!2sVia%20del%20Popolo%2C%2076%2C%2057016%20Rosignano%20Solvay-Castiglioncello%20LI!5e0!3m2!1sit!2sit!4v1621234567890!5m2!1sit!2sit";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMainRow}>
        {/* Versione Desktop: Dove Siamo - visibile solo su desktop */}
        {!isMobile && (
          <div className={styles.column}>
            <h3>Dove Siamo</h3>
            {/*<img src={logo} alt="Vistamare Logo" className={styles.logoFooterMap} />*/}
            <iframe
              title="Mappa"
              src={mapUrl}
              className={styles.mapIframe}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        {/* Contatti */}
        <div className={styles.column}>
          <h3>Contatti</h3>
          <p>Via del Popolo, 76</p>
          <p>57016 Rosignano Solvay-Castiglioncello LI</p>
          <p>Tel. <a style={{color: 'white'}} href="tel:0586762289">0586 762289</a></p>
          <p>Email: <a style={{color: 'white'}} href="mailto:vistamarerosignano@gmail.com">vistamarerosignano@gmail.com</a></p>
        </div>

        {/* Orari */}
        <div className={styles.column}>
          <h3>Orari</h3>
          <p>Lunedì, Mercoledì - Domenica:</p>
          <p>12:30 - 14:30</p>
          <p>19:30 - 22:00</p>
          <p>Martedì: chiuso</p>
        </div>

        {/* Mappa Mobile - con stile inline per forzare la visualizzazione */}
        {isMobile && (
          <div className={styles.mobileMapContainer} style={{
            width: '80%',
            margin: '1.5rem auto',
            backgroundColor: '#fff',
            padding: '4px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}>
            <iframe
              title="Mappa Mobile"
              src={mapUrl}
              style={{
                width: '100%',
                height: '180px',
                border: '0',
                borderRadius: '8px',
                display: 'block',
                visibility: 'visible'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        {/* Versione Mobile: Logo e Social in riga */}
        {isMobile ? (
          <div className={styles.mobileLogoSocialContainer} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            marginTop: '1rem'
          }}>
            <img src="/assets/logo.png" alt="Vistamare Logo" style={{
              height: '45px',
              width: 'auto',
              filter: 'brightness(0) invert(1)'
            }} />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a href="https://www.instagram.com/ristorantevistamare/" target="_blank" aria-label="Instagram" style={{ color: '#cbd5e0', fontSize: '1.5rem' }}><FaInstagram /></a>
              <a href="https://www.facebook.com/ristorantevistamarecheffabiosimpatia/" target="_blank" aria-label="Facebook" style={{ color: '#cbd5e0', fontSize: '1.5rem' }}><FaFacebook /></a>
              <a href="https://www.tripadvisor.it/Restaurant_Review-g1186329-d12335425-Reviews-Vistamare-Rosignano_Solvay_Province_of_Livorno_Tuscany.html" target="_blank" aria-label="TripAdvisor" style={{ color: '#cbd5e0', fontSize: '1.5rem' }}><FaTripadvisor /></a>
              {/*<a href="#" aria-label="WhatsApp" style={{ color: '#cbd5e0', fontSize: '1.5rem' }}><FaWhatsapp /></a>*/}
            </div>
          </div>
        ) : (
          // Versione Desktop: Icone Social verticali
          <div className={styles.column}>
            <h3>Seguici</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/ristorantevistamare/" target="_blank" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.facebook.com/ristorantevistamarecheffabiosimpatia/" target="_blank" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.tripadvisor.it/Restaurant_Review-g1186329-d12335425-Reviews-Vistamare-Rosignano_Solvay_Province_of_Livorno_Tuscany.html" target="_blank" aria-label="TripAdvisor"><FaTripadvisor /></a>
              {/*<a href="#" target="_blank" aria-label="WhatsApp"><FaWhatsapp /></a>*/}
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.bottomBarFull}>
        <p>&copy; {new Date().getFullYear()} Vistamare. Tutti i diritti riservati.</p>
        <div className={styles.legalLinksFull}>
          <a href="/privacypolicy">Privacy Policy</a>
          <a href="/cookiepolicy">Cookie Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); if (typeof window.openCookieModal === 'function') window.openCookieModal(); }}>Gestisci cookie</a>
          <a href="https://webbitz.it" target="_blank" rel="noopener noreferrer">Sito realizzato da Webbitz</a>
        </div>
      </div>
    </footer>
  );
}
