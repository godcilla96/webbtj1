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

//Routing
app.get("/cv", (req, res) => {
    res.json({message: "Nu har du tagit dig till cv-sidan"});
});
//Starta applikationen
app.listen(port, () => {
    console.log('Server startad på port: ' + port);
});
