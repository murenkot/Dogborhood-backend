const db = require('../models');

const addPost = (req, res) => {
    console.log(req.body);
    const postData = {...req.body, author: req.session.currentUser.id};
    // const postData = {...req.body};

    db.Post.create(postData, (error, createdPost)=>{
        if (error) return console.log(error);
        db.User.findById(createdPost.author, (err, foundUser) => {
            if (err) return console.log(err);
            foundUser.posts.push(createdPost._id);
            foundUser.save((err, updatedUser) => {
                if (err) return console.log(err);
                res.json({
                    status: 201,
                    data: createdPost,
                });
            });
        });
    });
}

// GET all posts
const showAll = (req, res) => {
    db.Post.find({})
    .populate('author')
    .populate('comments')
    .populate('interested')
    .populate('joined')
    .exec((err, allPosts) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: allPosts
        });
    });
};

userPosts = (req, res) => {
    db.Post.find({author: req.params.userId}, (error, foundUserPosts) => {
        if (error) return console.log(error);
        res.json({
            status: 200,
            data: foundUserPosts
        });
    })
}

// delete one post
const deletePost = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
        if (error) return console.log(error);
        res.json({
            status: 200,
            data: deletedPost
        });
    });
}



module.exports = {
    addPost,
    showAll,
    userPosts,
    deletePost,
}; 