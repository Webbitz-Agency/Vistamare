import React, { useEffect, useState } from 'react';
import styles from './CookieConsentModal.module.css';

const COOKIE_KEY = 'cookie_consent_v2';

const GA_ID = 'G-W6BKEMZ0Z2';
const META_PIXEL_ID = '1512719110645115';

const defaultPrefs = {
  technical: true,  // Sempre attivi
  analytics: false, // Google Analytics, etc.
  marketing: false, // Marketing e profilazione
};

// Caricano i tracker SOLO dopo il consenso (GDPR): niente script in _app/_document.
function loadGoogleAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

function loadMetaPixel() {
  if (window.__fbqLoaded) return;
  window.__fbqLoaded = true;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

const CookieConsentAdvanced = () => {
  const [open, setOpen] = useState(false);
  // consent = preferenze SALVATE (le uniche che attivano i tracker);
  // draft = stato delle checkbox nel modale, senza effetti finché non si salva.
  const [consent, setConsent] = useState(null);
  const [draft, setDraft] = useState(defaultPrefs);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(COOKIE_KEY));
    } catch {
      localStorage.removeItem(COOKIE_KEY);
    }
    if (saved && typeof saved === 'object') {
      const merged = { ...defaultPrefs, ...saved };
      setConsent(merged);
      setDraft(merged);
    } else {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!consent) return;
    if (consent.analytics) loadGoogleAnalytics();
    if (consent.marketing) loadMetaPixel();
  }, [consent]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setDraft((prev) => ({ ...prev, [name]: checked }));
  };

  const savePrefs = (newPrefs) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(newPrefs));
    // Se un tracker già caricato viene revocato, ricarica la pagina per rimuoverlo davvero.
    const revoked =
      (window.__gaLoaded && !newPrefs.analytics) ||
      (window.__fbqLoaded && !newPrefs.marketing);
    if (revoked) {
      window.location.reload();
      return;
    }
    setConsent(newPrefs);
    setDraft(newPrefs);
    setOpen(false);
  };

  const handleAcceptAll = () => {
    const all = { technical: true, analytics: true, marketing: true };
    savePrefs(all);
  };

  const handleRejectAll = () => {
    const none = { technical: true, analytics: false, marketing: false };
    savePrefs(none);
  };

  const handleSave = () => {
    savePrefs(draft);
  };

  // Per il link nel footer
  useEffect(() => {
    window.openCookieModal = () => setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        <h2 id="cookie-title">Preferenze Cookie</h2>
        <p>
          Questo sito utilizza cookie e tecnologie simili per garantire il corretto funzionamento delle procedure e migliorare l'esperienza di uso delle applicazioni online. 
          Per saperne di più, consulta la nostra <a href="/cookiepolicy" target="_blank" rel="noopener noreferrer">Cookie Policy</a>.
        </p>
        
        <button 
          className={styles.detailsButton}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Nascondi dettagli' : 'Mostra dettagli'}
        </button>

        <form className={styles.cookieForm}>
          <div className={styles.cookieRow}>
            <input type="checkbox" checked disabled id="technical" />
            <label htmlFor="technical">
              <b>Cookie tecnici</b>
              {showDetails && (
                <p className={styles.cookieDescription}>
                  Necessari per il funzionamento del sito. Senza questi cookie, il sito non funzionerebbe correttamente.
                  Non possono essere disattivati.
                </p>
              )}
            </label>
          </div>

          <div className={styles.cookieRow}>
            <input
              type="checkbox"
              id="analytics"
              name="analytics"
              checked={draft.analytics}
              onChange={handleChange}
            />
            <label htmlFor="analytics">
              <b>Cookie analitici</b>
              {showDetails && (
                <p className={styles.cookieDescription}>
                  Ci aiutano a capire come gli utenti interagiscono con il sito, fornendo informazioni anonime e aggregate.
                  Questi dati vengono utilizzati solo per migliorare il funzionamento del sito.
                </p>
              )}
            </label>
          </div>

          <div className={styles.cookieRow}>
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              checked={draft.marketing}
              onChange={handleChange}
            />
            <label htmlFor="marketing">
              <b>Cookie di marketing e profilazione</b>
              {showDetails && (
                <p className={styles.cookieDescription}>
                  Utilizzati per tracciare i visitatori sui siti web. L'intento è di visualizzare annunci pertinenti e coinvolgenti per il singolo utente.
                </p>
              )}
            </label>
          </div>
        </form>

        <div className={styles.buttonRow}>
          <button className={styles.accept} onClick={handleAcceptAll} type="button">
            Accetta tutti
          </button>
          <button className={styles.reject} onClick={handleRejectAll} type="button">
            Solo necessari
          </button>
          <button className={styles.save} onClick={handleSave} type="button">
            Salva preferenze
          </button>
        </div>

        <p className={styles.footer}>
          Puoi modificare le tue preferenze in qualsiasi momento visitando la nostra Cookie Policy.
          Le tue scelte non influiranno sulla navigazione del sito.
        </p>
      </div>
    </div>
  );
};

export default CookieConsentAdvanced; 