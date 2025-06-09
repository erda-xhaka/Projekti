const Category = require('../models/Category');

// Merr të gjitha kategoritë
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Gabim në marrjen e kategorive' });
  }
};

// Krijo kategori të re
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};