const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  crops:[{crop:{
    type:Schema.Types.ObjectId,
    refs:'Crop'
  }}]
});
//add crop to user
UserSchema.statics.addCrop = async function (id, args) {
  const Crop = mongoose.model('Crop');
  //starting from scratch
  const user = await this.findById(id);
  const crop = await Crop.findById(args.id);
  //crop.user = user._id;
  crop.users.push({"user":user});
  user.crops.push({"crop":crop});
  const result = Promise.all([crop.save(),user.save()]);
  return result;
};
const User = mongoose.model('User', UserSchema);

module.exports = User;
