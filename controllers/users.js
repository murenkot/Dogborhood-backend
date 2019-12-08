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
            foundUser.lng = req.body.lng,
            foundUser.lat= req.body.lat,

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

const findNearby = (req, res) => {
    console.log(req.body);
    let longitude = req.body.lng;
    let longitude_min = longitude - 0.07
    let longitude_max = longitude + 0.07

    let latitude = req.body.lat;
    let latitude_min = latitude - 0.07
    let latitude_max = latitude + 0.07

    db.User.find(
        {$and: 
            // [ {lat: { $range: [ latitude_min, latitude_max ]}, 
            //     lng: { $range: [ longitude_min, longitude_max ]}
            // }]
            [
                {lat: { $gte: longitude_min}},
                {lat: { $lte: longitude_max}},
            ]

            // {coordinates: 
            //     {longitude : { $gte: longitude_min}}},
            //     {coordinates: 
            //         {longitude : { $gte: longitude_min}}}, 
                // {coordinates: 
                //     {longitude : { $lte: longitude_max }}}, 
                // {coordinates: 
                //     {latitude: { $range: [ latitude_min, latitude_max ]}}}
        
        },
            (err, foundUsers)=>{
                if (err) console.log(err);
                res.status(200).json({
                    status: 200,
                    data: foundUsers
                });

            })
}


module.exports = {
    showAllUsers,
    showById,
    update,
    deleteUser,
    findNearby,
}; 