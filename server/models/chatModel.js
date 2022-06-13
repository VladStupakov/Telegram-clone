import mongoose from 'mongoose'

const chatShema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            text: String,
            timestamp: {
                type: String,
                default: '66.66'
            },
            media: [String],
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            readBy: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }]
        },
    ],
});

const Chat = mongoose.model('Chat', chatShema)

export default Chat