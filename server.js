// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sendEmail = require('./lib/send-email-handler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotte API
app.post('/send-email', async (req, res) => {
  try {
    // Simula l'oggetto req e res di Vercel serverless
    const result = await sendEmail({
      method: 'POST',
      body: req.body
    }, {
      status: (code) => ({
        json: (data) => {
          res.status(code).json(data);
          return { end: () => {} };
        }
      })
    });
  } catch (error) {
    console.error('Errore nel server:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server API in esecuzione sulla porta ${port}`);
}); 