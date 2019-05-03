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
function userCropArrayRemove(arr, value) {
  let temp =0;
  return arr.filter(function(ele){
      if(ele.user != value){
        return true;
      }else if(temp!=0){
        return true;
      } else {
        temp++;
        return false;
      }
      
  });
}
function cropUserArrayRemove(arr, value) {
  let temp =0;
  return arr.filter(function(ele){
      if(ele.crop != value){
        return true;
      }else if(temp!=0){
        return true;
      } else {
        temp++;
        return false;
      }
      
  });
}

UserSchema.statics.removeCrop = async function (id,args){
  const Crop = mongoose.model('Crop');
  const user = await this.findById(id);
  const crop = await Crop.findById(args.id);
  let resultUserCrop=userCropArrayRemove(crop.users,id);
  const resultCropUser = cropUserArrayRemove(user.crops,args.id);
  user.crops=resultCropUser;
  crop.users=resultUserCrop;
  const result = Promise.all([crop.save(),user.save()]);
  return result;
 // return user;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
