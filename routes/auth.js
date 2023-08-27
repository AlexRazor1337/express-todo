import express from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import crypto from 'crypto';
import db from '../db.js';

const router = express.Router();


passport.use(new LocalStrategy(function verify(username, password, cb){
    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.'});}

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha512', function(err, hashedPassword) {
        if (err)  { return cb(err); }
        if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
            return cb(null, false, {message: 'Incorrect username or password.'});
        }
        return cb(null, row);
    });
    });
}));


router.get('/login', (req, res, next) => {
    res.render('login');
});


router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));
export default router;
