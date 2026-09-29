const Product = require('../models/productModel'); // import the Product model
const asyncHandler = require('express-async-handler') // import the asyncHandler middleware from the express-async-handler package. This middleware is used to handle asynchronous route handlers and middleware functions in Express.js. It helps to catch errors that may occur in asynchronous code and pass them to the error handling middleware, preventing unhandled promise rejections and improving error handling in the application. By using asyncHandler, you can write cleaner and more concise code without having to manually handle errors in each asynchronous function.

// get all products
const getProducts = asyncHandler(async(req, res) => { 
  try {
    const products = await Product.find({}); 
    res.status(200).json(products); 
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a single product
const getProductById = asyncHandler(async(req, res) => { 
  try { 
    const { id } = req.params; 
    const product = await Product.findById(id); 
    if (!product) {
      return res.status(404).json({
        message: `Cannot find any product with ID ${id}`,
      }); 
    }
    res.status(200).json(product); 
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// create a new product
const createProduct = asyncHandler(async(req, res) => { 
    try {
      const product = await Product.create(req.body); 
      res.status(201).json(product); 

    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
});

// update a product 
const updateProduct = asyncHandler(async(req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findByIdAndUpdate(id, req.body); 
    if(!product){
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` }); 
    }
    const updatedProduct = await Product.findById(id); 
    res.status(200).json(updatedProduct); 

  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// delete a product
const deleteProduct = asyncHandler(async(req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findByIdAndDelete(id); 
    if (!product) { 
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }
    res.status(200).json({ message: `Product with ID ${id} has been deleted` });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}; 
