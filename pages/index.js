import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import ReservationForm from '../components/ReservationForm'
import PhilosophySection from '../components/PhilosophySection'
import GallerySlider from '../components/GallerySlider'
import ModernLinksSection from '../components/ModernLinksSection'
import AnimatedText from '../components/AnimatedText'
import ScrollReveal from '../components/ScrollReveal'
import TripAdvisorReviews from '../components/TripAdvisorReviews'
import { trackConversion, PHONE_NUMBER, PHONE_DISPLAY } from '../lib/track'
import styles from '../src/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Ristorante Vistamare | Pesce Fresco a Rosignano Solvay</title>
        <meta name="description" content="Ristorante Vistamare - Cucina di pesce fresco a Rosignano Solvay. Specialità di mare, materie prime locali e stagionali in un ambiente accogliente con vista mare." />
        <meta name="keywords" content="ristorante pesce vistamare, ristorante vistamare, pesce fresco rosignano, ristorante mare castiglioncello, cucina gourmet toscana, ristorante pesce toscana, rosignano solvay ristorante, ristorante pesce castiglioncello, ristorante lusso costa toscana, miglior ristorante pesce livorno" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vistamarerosignano.it/" />
        
        <meta property="og:title" content="Ristorante Vistamare | Pesce Fresco Rosignano Solvay" />
        <meta property="og:description" content="Il miglior ristorante di pesce della costa toscana. Cucina stagionale e vista mare." />
        <meta property="og:image" content="https://vistamarerosignano.it/assets/logo.png" />
        <meta property="og:url" content="https://vistamarerosignano.it/" />
        <meta property="og:type" content="restaurant" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Ristorante Vistamare",
              "description": "Ristorante di pesce fresco a Rosignano Solvay, specialità di mare e crudi di pesce. Il miglior ristorante di pesce tra Castiglioncello e Rosignano.",
              "url": "https://vistamarerosignano.it",
              "telephone": "+39 0586 762289",
              "email": "vistamarerosignano@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via del Popolo, 76",
                "addressLocality": "Rosignano Solvay",
                "addressRegion": "Toscana",
                "postalCode": "57016",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "43.3847",
                "longitude": "10.4339"
              },
              "servesCuisine": ["Italiana", "Pesce", "Frutti di mare", "Cucina gourmet"],
              "priceRange": "€€€",
              "acceptsReservations": true,
              "hasMenu": "https://vistamarerosignano.it/menu",
              "openingHours": [
                "Mo 12:30-14:30",
                "Mo 19:30-22:00",
                "We-Su 12:30-14:30",
                "We-Su 19:30-22:00"
              ],
              "areaServed": [
                "Rosignano Solvay",
                "Castiglioncello", 
                "Livorno",
                "Cecina",
                "Vada"
              ],
              "keywords": "ristorante pesce Rosignano Solvay, ristorante pesce Castiglioncello, pesce fresco Toscana, crudi pesce, ristorante lusso costa toscana",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
        
        {/* Schema.org per Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Ristorante Vistamare Rosignano Solvay",
              "image": "https://vistamarerosignano.it/assets/logo.png",
              "description": "Il miglior ristorante di pesce tra Castiglioncello e Rosignano Solvay. Specialità di mare, crudi di pesce e cucina gourmet con vista mare.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via del Popolo, 76",
                "addressLocality": "Rosignano Solvay",
                "addressRegion": "Toscana",
                "postalCode": "57016",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "43.3847",
                "longitude": "10.4339"
              },
              "url": "https://vistamarerosignano.it",
              "telephone": "+39 0586 762289",
              "email": "vistamarerosignano@gmail.com",
              "openingHours": [
                "Mo 12:30-14:30",
                "Mo 19:30-22:00",
                "We-Su 12:30-14:30",
                "We-Su 19:30-22:00"
              ],
              "paymentAccepted": "Cash, Credit Card",
              "currenciesAccepted": "EUR"
            })
          }}
        />
      </Head>
      
      <Header />
      
      <div>
        <Carousel />
      </div>
      
      <div className={styles.contentSection}>
        <section className={styles.intro}>
          <AnimatedText>
            <img 
              src="/assets/logo.png" 
              alt="Ristorante Vistamare Logo" 
              className={styles.logo} 
            />
          </AnimatedText>
          <AnimatedText delay={300}>
            <ScrollReveal delay={100}>
              <p>
              Benvenuti da Vistamare, il ristorante di pesce fresco a Rosignano Solvay dove ogni piatto racconta una storia di <span className={styles.highlight}>stagionalità</span>, <span className={styles.highlight}>sostenibilità</span> e <span className={styles.highlight}>territorio</span>.
              <br></br>Situato sulla splendida costa toscana tra Castiglioncello e Cecina, crediamo che mangiare bene significhi prima di tutto scegliere con cura — per il gusto, per la salute e per l'ambiente.              
              </p>
            </ScrollReveal>
          </AnimatedText>
        </section>

        <div className={styles.divPhilosophy} style={{ position: 'relative', zIndex: 1}}>
          <PhilosophySection />
        </div>        
        
        <div className={styles.fadeBottom}>
          <h1>SCOPRI "VISTAMARE":</h1>
          <ModernLinksSection />
        </div>
        
        <div className={styles.sectionSpacerLarge}>
          <AnimatedText delay={300}>
            <p>Nel nostro ristorante di pesce a Rosignano Solvay, utilizziamo <span className={styles.highlight}>materie prime fresche</span> a kilometro zero seguendo la stagionalità del mare grazie a filiere corte e pratiche di riuso.
            Ogni giorno, portiamo il <span className={styles.highlight}>mare che abbiamo davanti</span> nei piatti che prepariamo.</p>
          </AnimatedText>
        </div>

        <div className={`${styles.fadeBottom}`} style={{ position: 'relative', zIndex: 2 }}>
          <GallerySlider />
        </div>
        
        <div className={styles.sectionSpacerLarge}>
          <AnimatedText delay={300}>
            <p>In un mondo che corre veloce, il nostro ristorante sulla costa ha scelto di rallentare.
              Perché solo così possiamo <span className={styles.highlight}>gustare</span> davvero ciò che la <span className={styles.highlight}>natura del mare</span> ci offre.<br></br>
              Vistamare è un invito a vivere in modo più <span className={styles.highlight}>semplice</span> e sostenibile, nel cuore della Toscana marittima.</p>
          </AnimatedText>

          <div className={styles.gamberoRossoSection}>
            <AnimatedText delay={300}>
              <div className={styles.gamberoRossoContent}>
                <div className={styles.gamberoRossoText}>
                  Siamo orgogliosi di essere stati selezionati nella Guida
                  <span className={styles.gamberoRossoHighlight}>"Gambero Rosso"</span>
                  2024 come eccellenza della ristorazione di pesce in Toscana
                </div>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>

      <TripAdvisorReviews />

      <section className={styles.reservationStrip} id="reservation-form">
        <AnimatedText delay={300}>
          <h2>Ti aspettiamo</h2>
        </AnimatedText>
        <div className={styles.reservationColumns}>
          <div className={styles.callPanel}>
            <i className={`fa-solid fa-phone ${styles.callPanelIcon}`} aria-hidden="true"></i>
            <h3 className={styles.callPanelTitle}>Prenota subito</h3>
            <p className={styles.callPanelText}>
              Il modo più veloce: chiamaci e conferma il tuo tavolo in un minuto.
            </p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className={styles.callNowButton}
              onClick={() => trackConversion('Contact', { content_name: 'chiamata_sezione_prenota' })}
            >
              Chiama ora
            </a>
            <span className={styles.callPanelNumber}>{PHONE_DISPLAY}</span>
            <p className={styles.callPanelHours}>Tutti i giorni · 12:30–14:30 / 19:30–22:00</p>
            <p className={styles.callPanelAlt}>
              Oppure invia una richiesta con il modulo: ti ricontatteremo per confermare.
            </p>
          </div>
          <ReservationForm />
        </div>
      </section>

      <Footer />
    </div>
  )
} 