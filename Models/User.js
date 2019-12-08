const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatar: {
    type: String,
    default: "https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg"
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  dogName: {
    type: String,
    require: [true, 'Dog name is required'],
  },
  ownerName: {
    type: String,
    require: [true, 'Dog owner name is required'],
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
  street: {
    type: String,
    require: [true, 'Street is required'],
  },
  city: {
    type: String,
    require: [true, 'City is required'],
  },
  state: {
    type: String,
    require: [true, 'State is required'],
  },
  zipcode: {
    type: String,
    require: [true, 'Zipcode is required'],
  },
  coordinates: {
    longitude: Number,
    latitude: Number,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
  }],
  lng: {
    type: Number
  },
  lat: {
    type: Number
  }
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
