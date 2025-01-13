const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path');
const Database = require('better-sqlite3');
const dbPath = path.join(__dirname, '../../db/admins.db');
const adminDb = new Database(dbPath);

// POST: Hantera inloggning
router.post('/log-in', (req, res) => {
    console.log('Request body:', req.body);

    const { username, password } = req.body;
  
    try {
        const user = adminDb.prepare('SELECT * FROM admins WHERE username = ?').get(username);
        console.log('User from DB:', user);
        
        if (!user) {
          return res.status(401).json({ error: 'Användarnamn hittades inte.' });
        }
        
        const passwordMatch = bcrypt.compareSync(password, user.password);
        console.log('Password match:', passwordMatch);
        
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Felaktigt lösenord.' });
        }
  
      req.session.adminId = user.id;
      res.status(200).json({ message: 'Inloggning lyckades.' });
    } catch (error) {
      console.error('Inloggningsfel:', error);
      res.status(500).json({ error: 'Ett serverfel inträffade. Försök igen senare.' });
    }
  });

// POST: Hantera utloggning
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Utloggningsfel:', err);
      return res.status(500).json({ error: 'Ett serverfel inträffade vid utloggning.' });
    }
    res.status(200).end();
  });
});

module.exports = router;
