import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimatedText from '../components/AnimatedText'
import grazieStyles from './Grazie.module.css'

/** Allineato a pages/grazie.js (Next): conversione lead Meta su URL /grazie */
export default function Grazie() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead')
    }
  }, [])

  return (
    <div className={grazieStyles.page}>
      <Helmet>
        <title>Prenotazione ricevuta | Vistamare</title>
        <meta
          name="description"
          content="Richiesta di prenotazione inviata con successo al Ristorante Vistamare."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.vistamarerosignano.it/grazie/" />
      </Helmet>
      <Header />
      <main className={grazieStyles.main}>
        <div className={grazieStyles.hero}>
          <div className={grazieStyles.inner}>
            <AnimatedText>
              <div className={grazieStyles.card}>
                <h1 className={grazieStyles.title}>Grazie!</h1>
                <div className={grazieStyles.text} role="status">
                  Abbiamo ricevuto la tua richiesta di prenotazione. Ti contatteremo a breve per
                  confermare.
                </div>
                <Link to="/" className={grazieStyles.link}>
                  Torna alla home
                </Link>
              </div>
            </AnimatedText>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
