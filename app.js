import * as dotenv from 'dotenv';
dotenv.config();

import logger from 'morgan';
import * as path from 'path';
import express from 'express';
import passport from 'passport';
import pluralize from 'pluralize';
import createError from 'http-errors';
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
import * as cookieParser from 'cookie-parser';

const __dirname = path.resolve();

const SQLiteStoreInstance = SQLiteStore(session);

import router from './routes/index.js';

const app = express();

app.locals.pluralize = pluralize;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser.default());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStoreInstance({
        db: 'sessions.db',
        dir: './var/db'
    })
}));

app.use(passport.authenticate('session'));

app.use((req, res, next) => {
    const msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !!msgs.length;
    req.session.messages = [];
    next();
});

app.use('/', router);

app.use((req, res, next) => {
    next(createError(404));
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

export default app;
