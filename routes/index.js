const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Crop = require('../models/Crop');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated,async (req, res) =>
 { 
   res.render('dashboard', {
    user: req.user,
    cropData: await Crop.find({})
  });
});

module.exports = router;
