const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* Gets all users listing. */
router.get('/getAll', (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({
        error: 'Could not fetch all users!'
      });
    };
    
    res.status(200).json(result);
  });
});

/* Gets a specific user by ID */
router.get('/getById/:id', (req, res) => {
  const userId = req.params.id;
  User.findOne({
    _id: userId,
  }, (err, result) =>{
    if (err) {
      res.status(500).send({
        error: err,
      });
    };

    res.status(200).json(result);
  });
});

/* Creates a new user */
router.post('/create', (req, res) => {
  const {firstName, lastName, profilePicture, phone, email} = req.body;
  const newUser = new User({
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    profilePicture: profilePicture, 
    contactInfo: {
      phone: phone, 
      email: email,
    }, 
  });

  newUser.save((err, result) => {
    if (err) {
      res.status(500).send({
        error: err,
      });
    };

    res.status(200).json(result);
  });
});

/* Updates the user's portfolio */
router.put('/updateProfile/:id', (req, res) => {
  const userId = req.params.id;
  const {bio, skills, interests} = req.body;
  User.findOneAndUpdate({
    _id: userId
  }, {
    $set: {
      'profile.bio': bio,
      'profile.skills': skills,
      'profile.interests': interests,
    }
  }, {
    new: true,
  }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err,
      });
    }

    res.status(200).json(result);
  });
});

module.exports = router;
