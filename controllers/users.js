const db = require('../models');

// GET all users
const showAllUsers = (req, res) => {
    db.User.find({})
    // .populate('posts')
    .exec((err, allUsers) => {
        if (err) {
            return console.log(err)
        };
        res.json({
            status: 200,
            count: allUsers.length,
            data: allUsers,
        });
    });
};

const showById = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });
    
    db.User.findById()
}


module.exports = {
    showAllUsers,
}; 