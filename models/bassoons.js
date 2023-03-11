// Requiring the Mongoose package
const mongoose = require('mongoose');

const bassoonSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    details: { type: String, required: true},
    
})