# Ristorante Vistamare — sito web

Sito del ristorante Vistamare (Rosignano Solvay). Next.js 16 (Pages Router) + React 19, CSS Modules, Framer Motion, deploy su Vercel.

## Comandi

```bash
npm install
npm run dev    # sviluppo su http://localhost:3000
npm run build  # build di produzione
```

## Variabili d'ambiente (obbligatorie per il form prenotazioni)

Vedi `.env.local` (non versionato). Da configurare anche su Vercel:

- `GMAIL_USER` — account Gmail mittente
- `GMAIL_APP_PASSWORD` — app password Gmail (mai committarla)
- `RESERVATION_TO_EMAIL` — opzionale, destinatario alternativo per test

## Note sulla struttura

- `pages/` + `components/` (root) = versione Next.js attiva.
- `src/` contiene i residui della vecchia versione Vite: i `.jsx` sono morti,
  ma **i CSS Modules, `index.css`, `App.css` e `src/fonts/` sono ancora usati**
  dalle pagine attive. Non cancellare `src/` in blocco.
