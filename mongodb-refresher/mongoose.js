const mongoose = require('mongoose');

const Product = require('./models/product');


const createProduct = async ( req, res, next ) => {
    // create a new product by using the constructor function 
    // model('Product', productSchema) from product.js
    const createdProduct = new Product({
        
    })
}