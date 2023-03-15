const mongoose = require('mongoose');

const pastownerSchema = new mongoose.Schema ({
    pastownerName: {
        type: String
    },
    pastownerDates: {
        type: String,
        required: true
    },
    pastownerModifications: {
        type: String,
    }

});

module.exports = pastownerSchema