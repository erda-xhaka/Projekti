<<<<<<< HEAD
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));  // ose 'public/images'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
=======
// utils/upload.js
const multer = require('multer');
const path = require('path');

// Ruajtje në disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // sigurohu që ky folder ekziston
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
>>>>>>> 6270e43a (added new file)
  }
});

const upload = multer({ storage });

module.exports = upload;
