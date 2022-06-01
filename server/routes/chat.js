import express from 'express'
import Chat from '../models/chatModel.js'
import Channel from '../models/channelModel.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/create-chat', (req, res) => {
    const chat = req.body
    Chat.create(chat, (err, newChat) => {
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
    Channel.create(channel, (err, document) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send({ message: 'channel created' })
        }
    })
})

router.patch('follow', (req, res) => {
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
            User.updateMany({ _id: { $in: document.membders } }, { $pull: { chats: document._id } }, (error, result) =>{
                if(error){
                    return res.send(err)
                }
                else{
                    return res.send({message: 'channel deleted'})
                }
            })
        }
    })
})

export default router