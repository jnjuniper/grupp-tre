const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');


const productsDb = new Database('./db/products.db');
const adminsDb = new Database('./db/admins.db');
const heroDb = new Database('./db/hero_images.db');



const storage = multer.diskStorage({
  destination: './public/images', 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });


router.get('/', (req, res, next) => {
  try {
    const products = productsDb.prepare('SELECT * FROM products').all();
    const adminUsers = adminsDb.prepare('SELECT id, username, password FROM admins').all();
    const heroImages = heroDb.prepare('SELECT * FROM hero_images').all();

    res.render('admin/admin', {
      title: 'Administration',
      products,
      adminUsers,
      heroImages,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    next(error);
  }
});


router.post('/delete/:id', (req, res, next) => {
  const productId = req.params.id;

  try {
    const result = productsDb.prepare('DELETE FROM products WHERE id = ?').run(productId);

    if (result.changes === 0) {
      return res.status(404).send('Product not found');
    }

    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting product:', error.message);
    next(error);
  }
});


router.post('/update-admin/:id', async (req, res, next) => {
  const adminId = req.params.id;
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = adminsDb
      .prepare('UPDATE admins SET username = ?, password = ? WHERE id = ?')
      .run(username, hashedPassword, adminId);

    if (result.changes === 0) {
      return res.status(404).send('Admin user not found');
    }

    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating admin user:', error.message);
    next(error);
  }
});


router.post('/update-hero-images', upload.array('heroImages', 2), (req, res, next) => {
  try {
    const files = req.files;

    if (files.length !== 2) {
      return res.status(400).send('Please upload exactly 2 images.');
    }

    
    heroDb.prepare('UPDATE hero_images SET image_path = ? WHERE id = 1').run(`/images/${files[0].filename}`);
    heroDb.prepare('UPDATE hero_images SET image_path = ? WHERE id = 2').run(`/images/${files[1].filename}`);

    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating hero images:', error.message);
    next(error);
  }
});

module.exports = router;
