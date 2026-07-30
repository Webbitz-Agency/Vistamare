import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        {/* Google Analytics e Meta Pixel sono caricati da CookieConsentAdvanced
            solo dopo il consenso dell'utente (GDPR). */}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        
        {/* Preconnect per performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* Google Fonts (fogli di stile, non script) */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Tangerine:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Lexend+Deca:wght@100..900&family=Lexend+Giga:wght@100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" />
        
        {/* Manifest per PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta per crawling */}
        <meta name="facebook-domain-verification" content="wzk12k59ztwfprpu20b2ixcqq8gqxc" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* CSS inlining critico */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              height: 100% !important;
              margin: 0;
              padding: 0;
              overflow-y: auto !important;
              overflow-x: hidden;
              position: relative;
              -webkit-overflow-scrolling: touch;
            }
            #__next {
              height: 100%;
              overflow-y: auto !important;
              position: relative;
            }
            
            @media screen and (orientation: portrait), screen and (orientation: landscape) {
              html, body, #__next {
                height: 100% !important;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch;
              }
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 