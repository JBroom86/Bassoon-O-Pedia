// Requiring the Mongoose package
const mongoose = require('mongoose');
// const pastownerSchema = require('./pastowner');

// Fox Bassoon Schema
const bassoonFoxSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    details: { type: String, required: true},
    serialNumber: { type: Number },
    history: { type: String },
    photo: { type: String }
        // pastowners: [pastownerSchema]
});

// Exporting the schema as a Mongoose model
module.exports = mongoose.model('Fox', bassoonFoxSchema);