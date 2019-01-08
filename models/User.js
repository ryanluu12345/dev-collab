const mongoose = require('mongoose');

const contactInfo = {
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  }
};

const profile = {
  bio: {
    type: String,
    default: '',
  },
  skills: {
    type: Array,
    default: [],
  },
  interests: {
    type: Array,
    default: []
  }, 
  projects: {
    type: Array,
    default: [],
  },
};

const UserSchema = mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    }, 
    lastName: {
      type: String,
      required: true,
    },
  },
  profilePicture: {
    type: String,
    required: true,
    default: '',
  },
  contactInfo: contactInfo,
  profile: profile,
});

module.exports = mongoose.model('user',UserSchema);