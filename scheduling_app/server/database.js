const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function setupDatabase() {
    const db = await open({
        filename: 'events.db',
        driver: sqlite3.Database
    });

    await db.exec(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`);

    return db;
}

module.exports = setupDatabase;