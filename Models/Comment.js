const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    post: {
        type = Schema.Types.ObjectId,
        ref: 'Post',
    },
    body: {
        type: String,
        required: [true, "Comment cannot be empty"],
    }
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;