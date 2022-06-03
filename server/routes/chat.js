import express from 'express'
import Chat from '../models/chatModel.js'
import Channel from '../models/channelModel.js';
import User from '../models/userModel.js';
import multer from 'multer'
import * as fs from 'fs';

const router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/' + `${req.body.type}/` + `${req.body.id}/`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const message = JSON.parse(req.body.message)
        message.media.push(file.originalname)
        req.body.message = JSON.stringify(message)
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage }).array('files')

router.post('/create-chat', (req, res) => {
    const data = req.body
    Chat.create(data, (err, newChat) => {
        if (err) {
            return res.status(500).send({ err })
        }
        else {
            User.updateMany({ _id: { $in: newChat.members } }, { $addToSet: { chats: newChat._id } }, (err) => {
                if (err) {
                    return res.send(err)
                }
                else {
                    return res.status(200).send({ message: 'chat succefully created' })
                }
            })
        }
    })
})

router.patch('/add-chatmember', (req, res) => {
    const data = req.body
    const promises = [
        Chat.findByIdAndUpdate(data.chatId, { $addToSet: { members: data.userId } }),
        User.findByIdAndUpdate(data.userId, { $addToSet: { chats: data.chatId } })
    ]
    Promise.all(promises)
        .then(() => {
            return res.send({ message: 'new member added to chat' })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.patch('/leave-chat', (req, res) => {
    const data = req.body
    const promises = [
        User.findByIdAndUpdate(data.userId, { $pull: { chats: data.chatId } }),
        Chat.findByIdAndUpdate(data.chatId, { $pull: { members: data.userId } })
    ]
    Promise.all(promises)
        .then(() => {
            return res.send({ message: 'chat successfully left' })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.delete('/clear-chat', (req, res) => {
    const data = req.body
    Chat.findByIdAndUpdate(data.chatId, { $set: { 'messages': [] } }, { multi: true }, (err, document) => {
        if (err) {
            return res.send(err)
        }
        else
            return res.send({ message: 'chat cleared' })
    })
})

router.delete('/delete-chat', (req, res) => {
    const data = req.body
    Chat.findByIdAndDelete({ _id: data.chatId, members: data.userId }, (err, document) => {
        if (err) {
            return res.send(err)
        }
        if (!document) {
            return res.send({ message: 'you are not a chat member' })
        }
        else {
            User.updateMany({ _id: { $in: document.members } }, { $pull: { chats: document._id } }, (error, result) => {
                if (error) {
                    return res.send(err)
                }
                else {
                    return res.send({ message: 'chat deleted' })
                }
            })
        }
    })
})

router.post('/create-channel', (req, res) => {
    const data = req.body
    Channel.create(data, (err, document) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send({ message: 'channel created' })
        }
    })
})

router.patch('/follow', (req, res) => {
    const data = req.body
    let promises = []
    if (data.follow) {
        promises = [
            Channel.findByIdAndUpdate(data.channelId, { $addToSet: { followers: data.userId } }),
            User.findByIdAndUpdate(data.userId, { $addToSet: { channels: data.channelId } })
        ]
    }
    else {
        promises = [
            Channel.findByIdAndUpdate(data.channelId, { $pull: { followers: data.userId } }),
            User.findByIdAndUpdate(data.userId, { $pull: { channels: data.channelId } })
        ]
    }
    Promise.all(promises)
        .then(() => {
            return res.send({ message: data.follow ? 'followed' : 'unfollowed' })
        })
})

router.delete('/delete-channel', (req, res) => {
    const data = req.body
    Channel.findOneAndDelete({ _id: data.channelId, admins: data.userId }, (err, document) => {
        if (err) {
            return res.send(err)
        }
        if (!document) {
            return res.send({ message: 'access denied' })
        }
        else {
            User.updateMany({ _id: { $in: document.membders } }, { $pull: { chats: document._id } }, (error, result) => {
                if (error) {
                    return res.send(err)
                }
                else {
                    return res.send({ message: 'channel deleted' })
                }
            })
        }
    })
})

//send message in chat/channel
router.post('/', upload, (req, res) => {
    const { type, id, message } = req.body;
    message.readBy = [req.user._id]
    if (type === 'channel') {
        Channel.findByIdAndUpdate(id, { $addToSet: { messages: message, } }, (err, document) => {
            if (err) {
                return res.send({ err })
            }
            else {
                return res.send({ message: 'message sent' })
            }
        })
    }
    else {
        message.author = req.user._id
        Chat.findByIdAndUpdate(id, { $addToSet: { messages: message } }, (err, document) => {
            if (err) {
                return res.send({ err })
            }
            else {
                return res.send({ message: 'message sent' })
            }
        })
    }
})

//delete message from chat/channel
router.delete('/', (req, res) => {
    const { type, id, messageId } = req.body
    if (type == 'channel') {
        Channel.findByIdAndUpdate(id, { $pull: { messages: { _id: messageId } } }, (err, document) => {
            if (err) {
                return res.send(err)
            }
            if (!document) {
                return res.send({ message: 'access denied' })
            }
            else {
                return res.send({ message: 'message deleted' })
            }
        })
    }
    else {
        Chat.findByIdAndUpdate(id, { $pull: { messages: { _id: messageId } } }, (err, document) => {
            if (err) {
                return res.send(err)
            }
            if (!document) {
                return res.send({ message: 'access denied' })
            }
            else {
                return res.send({ message: 'message deleted' })
            }
        })
    }
})

//update message in chat/channel
router.put('/', upload, (req, res) => {
    const { type, id, message } = req.body
    if (type == 'channel') {
        Channel.findOneAndUpdate({ _id: id, "messages._id": message.id }, { $set: { "messages.$.text": message.text, "messages.$.timestamp": message.timestamp } }, (err, document) => {
            if (err) {
                return res.send({ err })
            }
            if (!document) {
                return res.send({ message: 'access denied' })
            }
            else {
                return res.send({ message: 'message updated' })
            }
        })
    }
    else {
        Chat.findOneAndUpdate({ _id: id, "messages._id": message.id }, { $set: { "messages.$.text": message.text, "messages.$.timestamp": message.timestamp } }, (err, document) => {
            if (err) {
                return res.send({ err })
            }
            if (!document) {
                return res.send({ message: 'access denied' })
            }
            else {
                return res.send({ message: 'message updated' })
            }
        })
    }
})


export default router