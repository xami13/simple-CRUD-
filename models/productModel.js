const mongoose = require('mongoose'); // import mongoose for database connection

// Define a Mongoose schema for the Product model
const productSchema = new mongoose.Schema( 
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },

    { timestamps: true }

);
    
// Create a Mongoose model named 'Product' using the defined schema
const Product = mongoose.model('Product', productSchema); 

// Export the Product model for use in other parts of the application
module.exports = Product; 
