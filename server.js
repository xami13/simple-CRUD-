require("dotenv").config(); // load environment variables from .env file
const express = require('express'); // import express for creating the server
const mongoose = require('mongoose'); // import mongoose for database connection
const Product = require('./models/productModel'); // import the Product model
const app = express(); // create an instance of the express application

const PORT = process.env.PORT || 3000; 
const mongoDB_URI = process.env.MONGODB_URI; 


//middleware
app.use(express.json()); // middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // middleware to parse URL-encoded data


//routes
// req, res --> request, response --> what are these? answer: they are objects that represent the HTTP request and response, respectively. The req object contains information about the incoming request, such as headers, query parameters, and body data. The res object is used to send a response back to the client, allowing you to set status codes, headers, and send data in various formats (e.g., JSON, HTML).
app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog  yo yo yo!');
});

app.get('/misc', (req, res) => {
  res.send('Hello Miscellaneous');   
});

// GET route to fetch all products
app.get('/products', async(req, res) => { 
  try {
    const products = await Product.find({}); // Fetch all product documents from the database
    res.status(200).json(products); // Send the fetched products as a JSON response with a 200 status code
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a product by its ID
app.get('/products/:id', async(req, res) => { 
  try { 
    const { id } = req.params; // Extract the product ID from the request parameters
    const product = await Product.findById(id); // Fetch the product document with the specified ID from the database
    if (!product) {
      return res.status(404).json({
        message: `Cannot find any product with ID ${id}`,
      }); // If the product is not found, send a 404 response with an error message
    }
    res.status(200).json(product); // Send the fetched product as a JSON response with a 200 status code
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to create a new product
app.post('/products', async(req, res) => { 
    try {
      const product = await Product.create(req.body); // Create a new product document in the database using the request body data [ const Product = require('./models/productModel'); ]
      res.status(201).json(product); // Send the created product as a JSON response with a 201 status code

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
});

// update a product
app.put('/products/:id', async(req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findByIdAndUpdate(id, req.body); // Update the product document with the specified ID in the database
    // cannot find any product in database with the given id
    if(!product){
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` }); // If the product is not found, send a 404 response with an error message
    }
    const updatedProduct = await Product.findById(id); // Fetch the updated product document from the database
    res.status(200).json(updatedProduct); // Send the updated product as a JSON response with a 200 status code

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product  
app.delete('/products/:id', async(req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    const product = await Product.findByIdAndDelete(id); // Delete the product document with the specified ID from the database
    if (!product) { 
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json({ message: `Product with ID ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

// db conn & server start
mongoose.
connect(mongoDB_URI) 
  .then(() => {

    console.log('Connected to MongoDB'); 

    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
});
    
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });  
