import express from 'express'
import Chat from '../models/chatModel.js'
import Channel from '../models/channelModel.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/addchat', (req, res) => {
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

router.patch('/addmember', (req, res) => {
    const data = req.body
    const promises = [
        Chat.findByIdAndUpdate(data.chatId, { $addToSet: { members: data.userId } }),
        User.findByIdAndUpdate(data.userId, { $addToSet: { chats: data.chatId } })
    ]
    Promise.all(promises)
        .then(() => { res.send({ message: 'new member added to chat' }) })
        .catch((err) => {
            console.log(err)
        })
})

export default router