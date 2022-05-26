import express from 'express'
import cors from 'cors'
import './config/dbConfig.js'
import session from 'express-session'
import passport from 'passport'
//import auth from './routes/auth.js'
//import chat from './routes/chat.js'
import MongoStore from 'connect-mongo';
import path from 'path';

const __dirname = (() => {let x = path.dirname(decodeURI(new URL(import.meta.url).pathname)); return path.resolve( (process.platform == "win32") ? x.substr(1) : x ); })();

 const app = express()
 const port = process.env.PORT || 9000


const sessionStore = new MongoStore({ mongoUrl: process.env.DB_CONNECTION_STRING, collection: 'sessions' })


app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { maxAge: 604800000 },
  unset: "destroy"
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/uploads'));
//app.use('/', auth)
//app.use('/main', chat);

app.listen(port, () => console.log(`Listening on port ${port}...`))


