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
// var result = arrayRemove(array, 6);

UserSchema.statics.removeCrop = async function (id,args){
  const Crop = mongoose.model('Crop');
  const user = await this.findById(id);
  // const usercrops = await this.find({crops:args.id});
  const crop = await Crop.findById(args.id);
  // const cropUserArr =user.crops;
  // const userCropArr = crop.users;
  console.log(id);
  console.log(`user:${user.crops}\n\n\n========`);
  console.log(`crop:${crop.users}\n\n\n\n=========`);
  //console.log(`crop:${userCropArr[2].user}`);
  let resultUserCrop=userCropArrayRemove(crop.users,id);
  console.log(`filtered array:${resultUserCrop}`);
  const resultCropUser = cropUserArrayRemove(user.crops,args.id);
  console.log(`filtered array:${resultCropUser}`);  
  // console.log(`crop:${usercrops}`);
  user.crops=resultCropUser;
  crop.users=resultUserCrop;
  const result = Promise.all([crop.save(),user.save()]);
  return result;
 // return user;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
