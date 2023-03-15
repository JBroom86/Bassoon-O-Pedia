const mongoose = require('mongoose');

const bassoonModelVidsSchema = new mongoose.Schema ({
    playerName: { type: String, required: true },
    video: { type: String, required: true },
    modelPlayed: { type: String, required: true }
});

// module.exports = pastownerSchema
module.exports = mongoose.model('ModelVids', bassoonModelVidsSchema);