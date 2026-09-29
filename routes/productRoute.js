const express = require('express'); 
const Product = require('../models/productModel'); // import the Product model
const { getProducts,
        getProductById, 
        createProduct,
        updateProduct,
        deleteProduct
} = require('../controller/productController'); // import the getProducts function from the productController

const router = express.Router(); // create a new router instance


// GET route to fetch all products
router.get('/', getProducts);

// GET route to fetch a product by its ID
router.get('/:id', getProductById);

// POST route to create a new product
router.post('/', createProduct);

// update a product
router.put('/:id', updateProduct);

// delete a product  
router.delete('/:id', deleteProduct);

module.exports = router; // export the router instance to be used in other files
