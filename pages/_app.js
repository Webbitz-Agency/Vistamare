import '../src/index.css'
import '../src/App.css'
import '../styles/datepicker.css'
import '../components/ScrollProgress.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'
import ScrollProgress from '../components/ScrollProgress'
import CustomCursor from '../components/CustomCursor'
import PrenotaOraButton from '../components/PrenotaOraButton'
import SmoothScroll from '../components/SmoothScroll'
import CookieConsentAdvanced from '../components/CookieConsentAdvanced'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [isDesktop, setIsDesktop] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // PageView sulle navigazioni interne (SPA): GA e Pixel lo inviano solo
  // al primo caricamento, qui copriamo i cambi di rotta client-side.
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', { page_path: url })
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView')
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* FontAwesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </Head>
      
      {/* Google Analytics e Meta Pixel vengono caricati da CookieConsentAdvanced
          solo dopo il consenso dell'utente (GDPR).
          I Google Fonts sono in _document.js come <link rel="stylesheet">. */}

      <div className="App">
        <CookieConsentAdvanced />
        {isDesktop && <CustomCursor />}
        <SmoothScroll />
        <ScrollProgress />
        <PrenotaOraButton />
        <Component {...pageProps} />
        <Analytics />
      </div>
    </>
  )
} 