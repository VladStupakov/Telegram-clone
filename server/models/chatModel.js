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
            timestamp: String,
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
    link: String
});

const Chat = mongoose.model('Chat', chatShema)

export default Chat