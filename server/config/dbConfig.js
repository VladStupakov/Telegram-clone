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
                length: newData.updateDescription.updatedFields.messages.length,
                data: newData.updateDescription.updatedFields.messages[newData.updateDescription.updatedFields.messages.length - 1],
                collection: newData.ns.coll,
                id: newData.documentKey._id
              });
        }
    })
    changeStreamChannels.on('change', (newData) =>{
        if(newData.operationType === 'update'){
            pusher.trigger("channels", "newMessage", {
                length: newData.updateDescription.updatedFields.messages.length,
                data: newData.updateDescription.updatedFields.messages[newData.updateDescription.updatedFields.messages.length - 1],
                collection: newData.ns.coll,
                id: newData.documentKey._id
              })
        }
    })
    
})