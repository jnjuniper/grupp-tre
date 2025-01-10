var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
    const dummyProduct = {
        id: req.params.id,
        name: "Sample Product",
        description: "This is a placeholder description.",
        price: 99.99,
        image: "https://via.placeholder.com/300"
    };
    res.render('product-details', {
        product: dummyProduct,
        title: dummyProduct.name // Use the product name as the page title
    });
});

module.exports = router;
