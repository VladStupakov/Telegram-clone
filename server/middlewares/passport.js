import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt'
import User from '../models/userModel.js';

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, cb) => {
        User.findOne({ email }, (error, user) => {
            if (error) {
                return cb(error, null)
            }
            if (!user) {
                return cb(null, false)
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return cb({ error: err }, null)
                }
                else {
                    if (result) {
                        user.isLogged = true
                        user.save((er, u) => {
                            if (er) {
                                return cb({error: er}, null)
                            }
                            else {
                                return cb(null, user)
                            }
                        })
                    }
                    else {
                        return cb(null, false)
                    }
                }
            });
        })
    }));

passport.serializeUser((user, cb) => {
    cb(null, user.id)
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err)
        }
        else {
            cb(null, {
                id: user._id,
                name: user.name,
                surname: user.surname,
                isLogged: true
            })
        }
    });
});

export default passport