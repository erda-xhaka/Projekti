// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Book = require('../models/Book');

// Konfigurimi i multer për ruajtjen e fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folderi ku ruhen fotot
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// GET: Merr të gjithë librat me filtrim sipas kategorisë ose zhanrit
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.genre) {
      filter.genre = { $in: req.query.genre.split(',').map(g => g.trim()) };
    }
    const books = await Book.find(filter).populate('category', 'name');
    res.json({ success: true, data: books });
  } catch (err) {
    console.error('[BOOKS GET ERROR]', err);
    res.status(500).json({ success: false, error: 'Ka ndodhur një gabim gjatë kërkimit të librave' });
  }
});

// GET: Merr libër sipas titullit
router.get('/by-title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const book = await Book.findOne({ title: title.trim() });
    if (!book) {
      return res.status(404).json({ success: false, message: 'Libri nuk u gjet' });
    }
    res.json({ success: true, data: book });
  } catch (err) {
    console.error('[BOOKS GET BY TITLE ERROR]', err);
    res.status(500).json({ success: false, error: 'Gabim gjatë marrjes së librit' });
  }
});

// POST: Shto libër të ri me foto
router.post('/', upload.single('cover'), async (req, res) => {
  try {
    const { title, author, price, category, genre } = req.body;

    if (!title || !author || !price || !category || !genre || !req.file) {
      return res.status(400).json({ success: false, error: 'Të gjitha fushat janë të nevojshme (title, author, price, category, genre, cover)' });
    }

    const genres = genre.split(',').map(g => g.trim());

    const newBook = new Book({
      title,
      author,
      price,
      category,
      genre: genres,
      cover: `/uploads/${req.file.filename}`,
      averageRating: 0,
      ratingCount: 0
    });

    const savedBook = await newBook.save();
    res.status(201).json({ success: true, data: savedBook });
  } catch (err) {
    console.error('[BOOKS POST ERROR]', err);
    res.status(400).json({ success: false, error: 'Gabim gjatë shtimit të librit' });
  }
});

// PATCH: Përditëso një libër ekzistues
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.title && !updateData.author && !updateData.price && !updateData.category && !updateData.genre) {
      return res.status(400).json({ success: false, error: 'Duhet të ofroni të paktën një fushë për t’u përditësuar' });
    }

    const book = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Libri nuk u gjet' });
    }

    res.json({ success: true, data: book });
  } catch (err) {
    console.error('[BOOKS PATCH ERROR]', err);
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE: Fshi një libër dhe foton e tij në disk
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Libri nuk u gjet' });
    }

    if (book.cover) {
      const filePath = path.join(__dirname, '..', 'public', book.cover);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Gabim gjatë kontrollit të fotos:', err);
        } else if (stats) {
          fs.unlink(filePath, (err) => {
            if (err) console.error('Gabim gjatë fshirjes së fotos:', err);
          });
        }
      });
    }

    res.json({ success: true, message: 'Libri u fshi me sukses' });
  } catch (err) {
    console.error('[BOOKS DELETE ERROR]', err);
    res.status(500).json({ success: false, error: 'Gabim gjatë fshirjes së librit' });
  }
});

// POST: Voto libër (rating mesatar dhe numër votash)
router.post('/:id/rating', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, error: 'Rating duhet të jetë nga 1 deri në 5' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Libri nuk u gjet' });
    }

    const totalRating = (book.averageRating * book.ratingCount) + rating;
    book.ratingCount += 1;
    book.averageRating = totalRating / book.ratingCount;

    await book.save();

    res.json({ success: true, data: book });
  } catch (err) {
    console.error('[BOOKS RATING ERROR]', err);
    res.status(500).json({ success: false, error: 'Gabim gjatë ruajtjes së rating' });
  }
});

module.exports = router;
