// Tracciamento conversioni lato client.
// Gli eventi partono solo se i tracker sono stati caricati (cioè dopo il
// consenso cookie dato in CookieConsentAdvanced): senza consenso, nessun dato.

export const PHONE_NUMBER = '0586762289';
export const PHONE_DISPLAY = '0586 762289';

const GA_EVENT_NAMES = {
  Contact: 'contact_call',
  Lead: 'generate_lead'
};

export function trackConversion(metaEvent, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', metaEvent, params);
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', GA_EVENT_NAMES[metaEvent] || metaEvent.toLowerCase(), params);
  }
}
