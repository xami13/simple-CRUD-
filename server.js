require("dotenv").config(); // load environment variables from .env file
const express = require('express'); // import express for creating the server
const mongoose = require('mongoose'); // import mongoose for database connection
const productRoutes = require('./routes/productRoute'); // import the product routes
const errorMiddleware = require('./middleware/errorMiddleware'); // import the error handling middleware
const cors = require('cors'); // import the CORS middleware to handle cross-origin requests --> The CORS (Cross-Origin Resource Sharing) middleware is imported to handle cross-origin requests in the application. CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. By using the CORS middleware, the server can specify which domains are allowed to access its resources, enabling controlled access to the API from different origins. This is particularly important for APIs that are consumed by web applications hosted on different domains.

const app = express(); // create an instance of the express application


const PORT = process.env.PORT || 3000; 
const mongoDB_URI = process.env.MONGODB_URI; 
const FRONTEND_URL = process.env.FRONTEND_URL;


// CORS configuration options 
var corsOptions = {
  origin: FRONTEND_URL, // 
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


// middleware 
app.use(cors(corsOptions)); // 
app.use(express.json()); // middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // middleware to parse URL-encoded data

app.use('/api/products', productRoutes); // This line mounts the productRoutes router on the '/api/products' path. It means that all routes defined in productRoutes will be prefixed with '/api/products'. For example, if there is a route defined as '/:id' in productRoutes, it will be accessible at '/api/products/:id' in the application. This helps in organizing and grouping related routes under a common path prefix.

// routes
// request, response --> they are objects that represent the HTTP request and response, respectively. The req object contains information about the incoming request, such as headers, query parameters, and body data. The res object is used to send a response back to the client, allowing you to set status codes, headers, and send data in various formats (e.g., JSON, HTML).
app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
  res.send('Hello Blog  yo yo yo!');
});

app.use(errorMiddleware); // This line adds the error handling middleware to the application. It should be placed after all other routes and middleware to catch any errors that occur during request processing. When an error is thrown in any route or middleware, it will be passed to this error handling middleware, allowing you to handle the error and send an appropriate response to the client.

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
