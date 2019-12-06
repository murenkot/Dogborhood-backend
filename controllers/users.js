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
    console.log(req.params.id);
    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    db.User.findById(req.params.id)
    .populate('posts')
    .exec((err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });

        res.status(200).json({
            status: 200,
            data: foundUser
        });
    });
}

const update = (req, res) => {
    console.log(req.body);

    if(!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    db.User.findById(req.session.currentUser.id, (err, foundUser)=>{
        if (err) {console.log(err); return};
            foundUser.ownerName = req.body.ownerName;
            foundUser.dogName = req.body.dogName;
            foundUser.address = req.body.address
            foundUser.avatar = req.body.avatar;
            foundUser.coordinates = req.body.coordinates;

        foundUser.save((err, updatedUser)=> {
            if (err) console.log(err);
            console.log(updatedUser);
        });

        res.json({
            status: 201,
            data: foundUser,
        })
    })
};

const deleteUser = (req, res) => {
    db.User.deleteOne({_id: req.params.id}, (err, deletedUser) => {
        if (err) return console.log(err);
            res.json({
            status: 200,
            data: deletedUser,
        });
    });
};


module.exports = {
    showAllUsers,
    showById,
    update,
    deleteUser,
}; 