const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    body: {
        type: String,
        required: [true, "Comment cannot be empty"],
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;