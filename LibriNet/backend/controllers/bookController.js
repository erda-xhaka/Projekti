const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

// Krijo libër të ri
exports.createBook = async (req, res) => {
  try {
    const { title, author, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Foto e kopertinës është e nevojshme' });
    }

    const book = await Book.create({
      title,
      author,
      price,
      category,
<<<<<<< HEAD
      cover: `/images/${req.file.filename}`,
      rating,
      ratingCount,

=======
      cover: `/uploads/${req.file.filename}`
>>>>>>> 6270e43a (added new file)
    });

    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Fshi foto të vjetra (nëse ka)
const deleteOldCover = async (filename) => {
  if (filename) {
<<<<<<< HEAD
    const filePath = path.join(__dirname, '../images', path.basename(filename));
=======
    const filePath = path.join(__dirname, '../uploads', path.basename(filename));
>>>>>>> 6270e43a (added new file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// Merr të gjithë librat
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('category');
    res.json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Gabim në marrjen e librave' });
  }
};

// Merr librat sipas kategorisë
exports.getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.categoryId }).populate('category');
    res.json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Gabim në filtër' });
  }
};
