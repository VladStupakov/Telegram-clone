import mongoose from 'mongoose'
import pusher from '../config/pusherConfig.js'

const conection_url = process.env.DB_CONNECTION_STRING
mongoose.connect(conection_url)

mongoose.connection.once('open', () => {
    const changeStreamChats = mongoose.connection.collection('chats').watch()
    const changeStreamChannels = mongoose.connection.collection('channels').watch()
    changeStreamChats.on('change', (newData) =>{
        if(newData.operationType === 'update'){
            pusher.trigger("chats", "newMessage", {
                data: newData
              });
        }
    })
    changeStreamChannels.on('change', (newData) =>{
        if(newData.operationType === 'update'){
            pusher.trigger("channels", "newMessage", {
                data: newData
              })
        }
    })
})