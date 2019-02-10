const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    img: {
        type: String
    },
    suggestions: {
        type: Array
    }
});

const Crop = mongoose.model('Crop', CropSchema);

module.exports = Crop;