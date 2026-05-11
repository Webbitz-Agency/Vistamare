import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W6BKEMZ0Z2"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-W6BKEMZ0Z2');
          `
        }} />

        {/* Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1512719110645115');
            fbq('track', 'PageView');
          `
        }} />
        <noscript dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1512719110645115&ev=PageView&noscript=1" />`
        }} />
        {/* End Meta Pixel Code */}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        
        {/* Preconnect per performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Manifest per PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta per crawling */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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