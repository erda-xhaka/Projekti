const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'YOUR_SECRET_KEY');
require('dotenv').config();

const app = express();

// Kontrollo nëse folderi 'uploads' ekziston, nëse jo krijo
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('[INFO] Folderi uploads u krijua');
}

// CORS konfigurim
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));

// Middleware për json dhe urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Shërbim statik për imazhe dhe uploads
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(uploadsDir));

// Kontroll Mongo URI
if (!process.env.MONGODB_URI) {
  console.error('[ERROR] MONGODB_URI mungon në .env');
  process.exit(1);
}

// Lidhja me MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('[SUCCESS] U lidh me MongoDB'))
.catch(err => {
  console.error('[ERROR] Gabim në lidhje me MongoDB:', err.message);
  process.exit(1);
});

// Import rruge
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categories');
const subscribeRoute = require('./routes/subscribe');
const contactRoute = require('./routes/contactRoutes');

// Përdor rruget
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subscribe', subscribeRoute);
app.use('/api/contact', contactRoute);

// Rruga bazë për test
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    timestamp: new Date().toISOString(),
    service: 'LibriNet API',
  });
});

// Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { bookId, bookPrice } = req.body;
    if (!bookId || !bookPrice) {
      return res.status(400).json({ error: 'bookId dhe bookPrice janë të nevojshme' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `Libri ${bookId}` },
          unit_amount: bookPrice * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/cancel',
      billing_address_collection: 'required',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('[STRIPE ERROR]', err);
    res.status(500).json({ error: 'Gabim gjatë krijimit të sesionit të pagesës' });
  }
});

// 404 handler për rrugët që nuk gjenden
app.use((req, res) => {
  res.status(404).json({ error: 'Rruga nuk u gjet' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({
    error: 'Gabim i brendshëm në server',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`[INFO] Serveri aktiv në portin ${PORT}`);
});

// SIGINT për mbyllje të pastër
process.on('SIGINT', () => {
  console.log('[INFO] Serveri po mbyllet...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('[INFO] Lidhja me MongoDB u mbyll');
      process.exit(0);
    });
  });
});
