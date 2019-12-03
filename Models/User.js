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
  coordinates: {
    longitude: String,
    latitude: String,
  },
  friends: [{
    type: Schema.Type.ObjectId,
    ref: 'User'
  }],
  posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
  }],
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
