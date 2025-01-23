var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');

const db = new Database('./db/products.db'); 

router.get('/', (req, res) => {
    try {
        const sort = req.query.sort || 'az'; 
        let query = 'SELECT * FROM products';


        if (sort === 'highest') {
            query += ' ORDER BY price DESC';
        } else if (sort === 'lowest') {
            query += ' ORDER BY price ASC';
        } else if (sort === 'az') {
            query += ' ORDER BY productName COLLATE NOCASE ASC';
        }

        const products = db.prepare(query).all();

        res.render('shop', {
            title: 'Shop',
            products,
            sort,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
