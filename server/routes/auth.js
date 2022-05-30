import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import passport from '../middlewares/passport.js'
import { confirmRegistrationLetter } from '../services/mailingService.js'
const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    User.create(user, (err, newUser) => {
        if (err) {
            return res.send(err)
        }
        else {
            confirmRegistrationLetter(res, newUser.email)
            return res.status(200).send('user registered')
        }
    })
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send({ user: req.user._id })
})

router.post('/logout', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            return res.send({ err })
        }
        else {
            user.isLogged = false
            user.save((err, u) => {
                if (err) {
                    return res.send({ err })
                }
                else {
                    req.session = null
                    res.redirect('/login')
                }
            })
        }
    });
})

router.patch('/confirm', (req, res) => {
    const id =  req.user_id
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(505).send({ err })
        }
        else {
            user.varified = true;
            user.save((err, document) => {
                if (err) {
                    return res.status(505).send({ err })
                }
                else {
                    return res.status(200).send({ message: 'email confirmed' })
                }
            })
        }
    })

});
export default router