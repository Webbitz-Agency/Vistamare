const nodemailer = require('nodemailer');

/**
 * Handler POST invio prenotazioni (Next pages/api, server.js).
 * Destinatario: sempre vistamarerosignano@gmail.com in produzione.
 * Solo se imposti RESERVATION_TO_EMAIL (es. staging / test locale) le richieste vanno lì.
 * Il campo `to` dal client non viene usato (evita abuso).
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const { subject, text, token } = req.body;

    if (token !== 'wdgc smro okea heia') {
      return res.status(401).json({ error: 'Token non valido' });
    }

    const defaultTo = 'vistamarerosignano@gmail.com';
    const recipient =
      (process.env.RESERVATION_TO_EMAIL && String(process.env.RESERVATION_TO_EMAIL).trim()) ||
      defaultTo;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'reservationwebbitz@gmail.com',
        pass: 'wdgc smro okea heia'
      }
    });

    const mailOptions = {
      from: 'Vistamare Prenotazioni <reservationwebbitz@gmail.com>',
      to: recipient,
      subject,
      text,
      replyTo: req.body.replyTo || 'reservationwebbitz@gmail.com'
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return res.status(500).json({ error: 'Errore nell\'invio dell\'email', details: error.message });
  }
};
