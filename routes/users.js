const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
//load crop model
const Crop = require('../models/Crop');

// Login Page
router.get('/login', (req, res) => res.render('welcome'));

// Register Page
router.get('/register', (req, res) => res.render('welcome'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('welcome', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('welcome', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


//-->api functions

//functions create user crops
const createUserCrops =  async (req, res)=>{
   console.log(req.body);
   const crop = req.body;
   const {userId} =req.params;
   console.log(crop);
   console.log("userId:"+userId);

   if(!userId){
       return res.status(400).json({error:true, message:"userId must be provided"});
   }
   try {
    const crops= await User.addCrop(userId, crop); 
      return res.status(201).json({error:false,success:true,crops});
   } catch(e){
    console.log(e.message);
    return res.status(400).json({error: true, message:e.message});
   }
};


//get crops by user
const getUserCrops = async (req, res) => {
  console.log(req.params);
  let { userId } = req.params;
  console.log(userId);

  if(!userId){
      return res.status(400).json({ error: true, message: 'you need to provide userId' });
  }

  //search to see if crop exist
  const user = await User.findById(userId);
  
  if(!user){
      return res.status(400).json({ error: true, message: 'User does not exist' });
  }
  try{
    const crop= await User.findById(userId).populate({path:'crops.crop',model:'Crop'});
    return res.status(200).json({ 
      error: false,
      crops: crop.crops
    });

  } catch(e){
    return res.status(400).json({ error: true, message: 'cannot fetch User' });
  }
  
};

//remove user crops
const removeUserCrops =  async (req, res)=>{
  console.log(req.body);
  const crop = req.body;
  const {userId} =req.params;
  console.log(crop);
  console.log("userId:"+userId);

  if(!userId){
      return res.status(400).json({error:true, message:"userId must be provided"});
  }
  try {
   const crops= await User.removeCrop(userId, crop); 
     return res.status(201).json({error:false,success:true,crops,message:"crop removed"});
  } catch(e){
   console.log(e.message);
   return res.status(400).json({error: true, message:e.message});
  }
};

//-->routes api

//create user crops
router.post('/:userId/crops/new',createUserCrops);
//get user crops
router.get('/:userId/crops',getUserCrops);
//remove user crops
router.post('/:userId/crops/delete',removeUserCrops);
//all users
router.get('/allusers',async (req,res)=>{
  const users=await User.find({});
  console.log(users);
  res.status(200).json({list:users});
});

module.exports = router;
