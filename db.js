import { mkdirp } from 'mkdirp'
import sqlite3 from 'sqlite3';
import crypto from 'crypto';

const DB_PATH = './var/db';

mkdirp.sync(DB_PATH);
const db = new sqlite3.Database(`${DB_PATH}/db.sqlite`);

db.serialize(() => {
   db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password BLOB, salt BLOB, name TEXT, email TEXT UNIQUE, email_verified INTEGER)'); 
   db.run('CREATE TABLE IF NOT EXISTS federated_credentials (id INTEGER PRIMARY KEY, user_id INTEGER, provider TEXT NOT NULL, subject TEXT NOT NULL, UNIQUE (provider, subject))');
   db.run('CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY, owner_id INTEGER NOT NULL, title TEXT NOT NULL, completed INTEGER)');
   
   const salt = crypto.randomBytes(16);
   db.run('INSERT OR IGNORE INTO users (username, password, salt, email, email_verified) VALUES (?, ?, ?, ?, ?)', ['admin', crypto.pbkdf2Sync('admin', salt, 310000, 32, 'sha512'), salt, 'email@test.com@', 1]);
});

export default db;
