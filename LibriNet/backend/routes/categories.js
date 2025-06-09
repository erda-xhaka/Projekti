const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
<<<<<<< HEAD

// ✅ [GET] Merr të gjitha kategoritë
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('[ERROR] Gjatë marrjes së kategorive:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// ✅ [GET] Merr vetëm 3 kategoritë për seksionin “Top Genres”
router.get('/top-genres', async (req, res) => {
  try {
    const allCategories = await Category.find();

    const topGenres = allCategories.filter(cat =>
      ['Romance', 'History', 'Self-Help'].includes(cat.name)
    );

    res.status(200).json({ success: true, data: topGenres });
  } catch (error) {
    console.error('[ERROR] Gjatë marrjes së top genres:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch top genres' });
  }
});


// ✅ [POST] Krijo një kategori të re
router.post('/', async (req, res) => {
  try {
    const { name, description, image } = req.body;  // merr vetëm fushat që ekzistojnë
    const newCategory = new Category({ name, description, image });
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error('[ERROR] Gjatë krijimit të kategorisë:', error.message);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

module.exports = router;
=======
const path = require('path');
const fs = require('fs');
const upload = require('../utils/upload');

const handler = async (req, res) => {

  if (req.method === 'GET') {
    const categories = await Category.find();
    return res.status(200).json(categories);
  }

  if (req.method === 'POST') {
    const { id, name, description, image } = req.body;
    const newCategory = new Category({ id, name, description, image });
    await newCategory.save();
    return res.status(201).json(newCategory);
  }

  res.status(405).end(); // Method Not Allowed
};

module.exports = handler;
>>>>>>> 6270e43a (added new file)
