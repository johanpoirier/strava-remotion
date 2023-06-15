const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbName = path.join(__dirname, 'data', 'back.db');
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database is up.');
});

function setup() {
  const rendersCreate = `CREATE TABLE IF NOT EXISTS renders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId VARCHAR(10) NOT NULL,
      token VARCHAR(250) NOT NULL,
      createdAt INTEGER(4) NOT NULL default (strftime('%s','now')),
      lang VARCHAR(2) NOT NULL default "en",
      status INTEGER(1) DEFAULT 0
    );`;

  db.run(rendersCreate, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

async function addRender({ userId, token, lang = 'fr' }) {
  return new Promise((resolve, reject) => {
    const rendersAdd = `INSERT INTO renders (userId, token, lang) VALUES ('${userId}', '${token}', '${lang}');`;
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

async function getRenders() {
  return new Promise((resolve, reject) => {
    const rendersGet = 'SELECT * FROM renders';
    db.all(rendersGet, function (err, results) {
      if (err) {
        reject(new Error(err.message, err));
        return;
      }
      resolve(results);
    });
  });
}

async function getRendersByUserId(userId) {
  return new Promise((resolve, reject) => {
    const rendersGet = 'SELECT * FROM renders WHERE userId = ? ORDER BY createdAt DESC';
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
    const rendersGet = 'SELECT * FROM renders where status = 0 ORDER BY createdAt ASC';
    db.all(rendersGet, function (err, results) {
      if (err) {
        reject(new Error(err.message, err));
        return;
      }
      resolve(results);
    });
  });
}

async function getFirstRenderToRun() {
  return new Promise((resolve, reject) => {
    const renderGet = 'SELECT * FROM renders where status = 0 ORDER BY createdAt ASC LIMIT 1';
    db.get(renderGet, function (err, result) {
      if (err) {
        reject(new Error(err.message, err));
        return;
      }
      resolve(result);
    });
  });
}

async function isRenderInProgress() {
  return new Promise((resolve, reject) => {
    const rendersGet = 'SELECT * FROM renders where status = 1';
    db.get(rendersGet, function (err, results) {
      if (err) {
        reject(new Error(err.message, err));
        return;
      }
      resolve(results && results.length > 0);
    });
  });
}

async function markRenderAsDone(renderId) {
  return markRender(renderId, 2);
}

async function markRenderAsInProgress(renderId) {
  return markRender(renderId, 1);
}

async function markRenderAsFailed(renderId) {
  return markRender(renderId, 3);
}

async function markRender(renderId, status) {
  return new Promise((resolve, reject) => {
    const renderUpdate = `UPDATE renders SET status = ? WHERE id = ${renderId};`;
    const params = [status];
    db.run(renderUpdate, params, function (err) {
      if (err) {
        console.error(err.message);
        reject(new Error('Failed to update render', err));
        return;
      }
      resolve();
    });
  });
}

async function cleanRenderingJobs() {
  return new Promise((resolve, reject) => {
    const rendersUpdate = 'UPDATE renders SET status = 0 WHERE status = 1;';
    db.run(rendersUpdate, function (err) {
      if (err) {
        console.error(err.message);
        reject(new Error('Failed to clean renders', err));
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  setup,
  addRender,
  getRenders,
  getRenderById,
  getRendersByUserId,
  getFirstRenderToRun,
  markRenderAsInProgress,
  markRenderAsDone,
  markRenderAsFailed,
  isRenderInProgress,
  cleanRenderingJobs,
};
