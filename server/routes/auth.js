import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import passport from '../middlewares/passport.js'
import { confirmRegistrationLetter } from '../services/mailingService.js'
import logger from '../middlewares/logger.js'
const router = express.Router();

router.post('/register', async (req, res) => {
    const data = req.body
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)
    User.create(data, (err, newUser) => {
        if (err) {
            return res.json({ error: err })
        }
        else {
            confirmRegistrationLetter(newUser.email)
            return res.status(200).json({ message: 'user registered' })
        }
    })
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: 'successful login' })
})

router.post('/logout', logger, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) {
            return res.json({ error: err })
        }
        else {
            user.isLogged = false
            user.save((error, user) => {
                if (error) {
                    return res.json({ error })
                }
                else {
                    req.session = null
                    return res.status(200).json({ success: 'successful logout' })
                }
            })
        }
    });
})

router.patch('/confirm',  (req, res) => {
    const id = req.user_id
    User.findById(id, (err, user) => {
        if (err) {
            return res.send({ error: err })
        }
        else {
            user.varified = true;
            user.save((error, document) => {
                if (error) {
                    return res.json({ error })
                }
                else {
                    return res.status(200).json({ success: 'email confirmed' })
                }
            })
        }
    })
});

export default router