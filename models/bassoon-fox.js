// Requiring the Mongoose package
const mongoose = require('mongoose');

// Fox Bassoon Schema
const bassoonFoxSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    details: { type: String, required: true},
    serialNumber: { type: Number, required: true},
    history: { type: String },
    photo: { type: String }
});

// Exporting the schema as a Mongoose model
module.exports = mongoose.model('Fox', bassoonFoxSchema);