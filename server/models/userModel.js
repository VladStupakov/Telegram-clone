import mongoose from 'mongoose'


const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    surname: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        isPrivate: {
            type: Boolean,
            default: true
        }
    },
    varified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: ''
    },
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel'
        }
    ],
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ],
    blackList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    lastSeenAt: {
        type: String,
        default: ''
    },
    isLogged: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', userShema)

export default User