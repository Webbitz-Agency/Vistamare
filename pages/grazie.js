import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimatedText from '../components/AnimatedText'
import grazieStyles from '../src/pages/Grazie.module.css'
import { trackConversion } from '../lib/track'

/**
 * Pagina dedicata alle conversioni lead (Meta Ads / Pixel).
 * Configura in Events Manager una conversione personalizzata per URL:
 * https://www.vistamarerosignano.it/grazie/
 * Il Pixel carica già PageView su ogni pagina; qui inviamo anche l'evento standard Lead.
 */
export default function Grazie() {
  useEffect(() => {
    // One-shot per sessione: refresh o back/forward non rigenerano la conversione
    if (sessionStorage.getItem('lead_tracked')) return
    sessionStorage.setItem('lead_tracked', '1')
    trackConversion('Lead', { content_name: 'form_prenotazione' })
  }, [])

  return (
    <div className={grazieStyles.page}>
      <Head>
        <title>Prenotazione ricevuta | Vistamare</title>
        <meta
          name="description"
          content="Richiesta di prenotazione inviata con successo al Ristorante Vistamare."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.vistamarerosignano.it/grazie/" />
      </Head>
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
                <Link href="/" className={grazieStyles.link}>
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
