const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, 'Title of event is required']
    },
    body: {
        type: String,
        required: [true, 'Description of event is required']
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    startTime: {
        type: Date,
        // required: [true, 'Start Time of event is required']
    },
    endTime: {
        type: Date,
        // required: [true, 'End Time of event is required']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    interested: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    joined: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],

})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;