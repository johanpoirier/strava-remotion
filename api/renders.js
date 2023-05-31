const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbName = path.join(__dirname, 'data', 'back.db');
const db = new sqlite3.Database(dbName, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('SQLite database is up.');
});

function setup() {
    const rendersCreate = `CREATE TABLE IF NOT EXISTS renders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId VARCHAR(10) NOT NULL,
      token VARCHAR(250) NOT NULL,
      createdAt INTEGER(4) NOT NULL default (strftime('%s','now')),
      status INTEGER(1) DEFAULT 0
    );`;

    db.run(rendersCreate, err => {
        if (err) {
            return console.error(err.message);
        }
    });
}

async function addRender(userId, token) {
    return new Promise((resolve, reject) => {
        const rendersAdd = `INSERT INTO renders (userId, token) VALUES ('${userId}', '${token}');`;
        db.run(rendersAdd, function (err, result) {
            if (err) {
                console.error(err.message);
                reject(new Error('Failed to insert new render', err));
                return;
            }
            resolve(this.lastID);
        });
    });
}

async function getRenderById(renderId) {
    return new Promise((resolve, reject) => {
        const renderGet = 'SELECT * FROM renders where id = ?';
        const params = [renderId];
        db.get(renderGet, params, function (err, result) {
            if (err) {
                console.log(err.message);
                reject(new Error(err.message, err));
                return;
            }
            resolve(result);
        });
    });
}

async function getRendersByUserId(userId) {
    return new Promise((resolve, reject) => {
        const rendersGet = 'SELECT * FROM renders where userId = ?';
        const params = [userId];
        db.all(rendersGet, params, function (err, results) {
            if (err) {
                reject(new Error(err.message, err));
                return;
            }
            resolve(results);
        });
    });
}

async function getRendersToRun() {
    return new Promise((resolve, reject) => {
        const rendersGet = 'SELECT * FROM renders where status = 0';
        db.all(rendersGet, function (err, results) {
            if (err) {
                reject(new Error(err.message, err));
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {setup, addRender, getRenderById, getRendersByUserId, getRendersToRun};
