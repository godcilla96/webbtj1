//installation sqlite
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./cv.db");

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS workexperience;");

    db.run(`
        CREATE TABLE  workexperience (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyname TEXT NOT NULL,
            jobtitle TEXT NOT NULL,
            location TEXT NOT NULL,
            startdate DATE NOT NULL,
            endndate DATE NOT NULL
        );
    `);
});

db.close();