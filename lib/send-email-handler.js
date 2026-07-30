const nodemailer = require('nodemailer');

/**
 * Handler POST invio prenotazioni (Next pages/api).
 * Destinatario: sempre vistamarerosignano@gmail.com in produzione.
 * Solo se imposti RESERVATION_TO_EMAIL (es. staging / test locale) le richieste vanno lì.
 * Il campo `to` dal client non viene usato (evita abuso).
 * Credenziali SMTP: GMAIL_USER / GMAIL_APP_PASSWORD (mai hardcodate).
 */

// Rate limit in-memory: max 5 richieste per IP ogni 10 minuti.
// Su Vercel ogni istanza serverless ha la sua mappa: è un freno best-effort, non un WAF.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  // Evita crescita illimitata della mappa su processi long-lived
  if (requestLog.size > 1000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key);
    }
  }
  const entries = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (entries.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, entries);
    return true;
  }
  entries.push(now);
  requestLog.set(ip, entries);
  return false;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const user = process.env.GMAIL_USER || 'reservationwebbitz@gmail.com';
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) {
    console.error('GMAIL_APP_PASSWORD non configurata');
    return res.status(500).json({ error: 'Servizio email non configurato' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Troppe richieste, riprova più tardi' });
  }

  try {
    const { subject, text } = req.body || {};

    if (typeof subject !== 'string' || typeof text !== 'string' || !subject.trim() || !text.trim()) {
      return res.status(400).json({ error: 'Dati mancanti' });
    }
    if (subject.length > 200 || text.length > 5000) {
      return res.status(400).json({ error: 'Contenuto troppo lungo' });
    }

    const defaultTo = 'vistamarerosignano@gmail.com';
    const recipient =
      (process.env.RESERVATION_TO_EMAIL && String(process.env.RESERVATION_TO_EMAIL).trim()) ||
      defaultTo;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    const mailOptions = {
      from: `Vistamare Prenotazioni <${user}>`,
      to: recipient,
      subject,
      text,
      replyTo:
        typeof req.body.replyTo === 'string' && /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(req.body.replyTo.trim())
          ? req.body.replyTo.trim()
          : user
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    return res.status(500).json({ error: "Errore nell'invio dell'email" });
  }
};
