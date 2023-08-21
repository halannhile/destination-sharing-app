const mongoose = require('mongoose');

const Product = require('./models/product');

// this manages the entire connection between our backend and mongoDB database
// so we don't need to open and close the connection each time we create a new product
mongoose.connect(
    'mongodb+srv://nhile:2Egsnviay9LJ7FgG@cluster0.ryygtfp.mongodb.net/products_test?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});



const createProduct = async (req, res, next) => {
    // create a new product by using the constructor function 
    // model('Product', productSchema) from product.js
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    const result = await createdProduct.save();
    
    res.json(result);
};
    
exports.createProduct = createProduct;


