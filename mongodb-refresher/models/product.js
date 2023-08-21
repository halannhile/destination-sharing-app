const mongoose = require('mongoose');

// Schema() method is a constructor function
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

// arguments for model(): name of schema, the schema object we created
module.exports = mongoose.model('Product', productSchema);



