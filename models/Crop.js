const mongoose = require('mongoose');
const { Schema } = mongoose;
const CropSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    img: {
        type: String
    },
    suggestions: {
        type: Array
    },
    users:[{user:{
      type:Schema.Types.ObjectId,
      refs:'User',
      unique: true,
      dropDups:true
    }}]
});

const Crop = mongoose.model('Crop', CropSchema);

module.exports = Crop;
