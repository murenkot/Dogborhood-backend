const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req, res) => {
    console.log(req.body);
    if (!req.body.ownerName || !req.body.dogName || !req.body.email || !req.body.password) {
        return res.json({ status: 400, message: "Please enter your name, your dog's name, email, and password" });
    }

    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.json({ status: 500, message: 'Something went wrong... Please try again!'});
        if (foundUser) return res.json({ status: 400, message: 'Something went wrong... Please try again!'});
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.json({ status: 500, message: 'Something went wrong. Please try again' });
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again'});
        
                const newUser = {
                    email: req.body.email,
                    password: hash,
                    dogName: req.body.dogName,
                    ownerName: req.body.ownerName,
                    address: {
                        street: req.body.street,
                        city: req.body.city,
                        state: req.body.state,
                        zipcode: req.body.zipcode,
                    },
                    coordinates: {
                        longitude: Number(req.body.latLng.lng),
                        latitude: Number(req.body.latLng.lat),
                    }
                }
        
                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({ status: 500, message: err});
                    req.session.currentUser = { id: savedUser._id };
                    return res.status(201).json({ status: 201, data: savedUser._id, message: 'Success' });
                });
            });
        });
    });

};

//POST Login
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 400, message: 'Please enter your email and password' });
    }
    
    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });
    
        if (!foundUser) {
            return res.status(400).json({ status: 400, message: 'Email or password is incorrect'});
        }
    
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });

            if (isMatch) {
                req.session.currentUser = { id: foundUser._id };
                return res.status(200).json({ status: 200, message: 'Success', data: foundUser._id });
            } else {
                return res.status(400).json({ status: 400, message: 'Email or password is incorrect' });
            }
        });
    });
};

//Post Logout
const logout = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({ status: 401, message: 'Unauthorized' });

    req.session.destroy((err) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong, please try again' });
        return res.sendStatus(200);
    });
};

module.exports = {
    register,
    login,
    logout
};