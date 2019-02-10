const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Crop = require('../models/Crop');

// Fetch crop data
// getCropData = async () => {
//   Crop.find().then(data => {
//     const cropData = data;
    
//     // console.log(cropData);
//     return cropData;
//   });
// }

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
// Crop.find().then(data => {
//   const cropData = data;
//   res.render('dashboard', {
//     user: req.user,
//   });
//   console.log(cropData);
//   console.log(req.user);
// }) 
  // let cropData = Crop.find({}),(err,data)=>{
  //   if (err) console.error(err);
  //   else return data;
  // })
  //  console.log(cropData);
  res.render('dashboard', {
    user: req.user,
    cropData: await Crop.find()
  });

});

module.exports = router;

//let a=await Contact.find({user:mongoose.Types.ObjectId(req.user.id)});