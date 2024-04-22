//Installerat:
//Express
//Nodemon
//body-parser
//dotenv
//cors

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3300;
const cors = require("cors"); 


app.use(cors());
app.use(express.json());

//Middleware
app.use(bodyParser.json());

//databaskod
const sqlite3 = require("sqlite3").verbose();
app.use(express.urlencoded({ extended: true }));
const db = new sqlite3.Database("./cv.db");

//Statiska filer
app.use(express.static('public'));

//Routing
app.get("/cv", (req, res) => {
    res.json({message: "Nu har du tagit dig till cv-sidan"});
});

app.get("/cv/workexperience", (req, res) => {
    db.all("SELECT * FROM workexperience", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
        console.table(rows);
    });
});

app.get("/cv/workexperience/:id", (req, res) => {
    const id = req.params.id;

    // inhämta all information från tabellen för det angivna id:t
    db.get("SELECT * FROM workexperience WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            // om ingen data matchar id:t visas errormeddelande
            res.status(404).json({ message: "Work experience not found" });
            return;
        }
        res.json(row);
    });
});


//lägga till arbetserfarenhen
app.post("/cv/workexp", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    db.run(
        "INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)",
        [companyname, jobtitle, location, startdate, enddate, description],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Work experience added", id: this.lastID });
        }
    );
});

//radera arbetserfarenhet via id
app.delete("/cv/workexp/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM workexperience WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: `Work experience with ID ${id} deleted` });
    });
});

//uppdatera arbetserfarenhet via id
app.put("/cv/workexp/:id", (req, res) => {
    const { companyname, jobtitle, location, startdate, enddate, description } = req.body;
    const id = req.params.id;
    db.run(
        "UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, startdate = ?, enddate = ?, description = ? WHERE id = ?",
        [companyname, jobtitle, location, startdate, enddate, description, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: `Work experience with ID ${id} updated` });
        }
    );
});

//Starta applikationen
app.listen(port, () => {
    console.log('Server startad på port: ' + port);
});
