const express = require('express');
const mongoose = require('mongoose');
const mustache = require('mustache-express');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const ws = require("ws");
const mainRouter = require('./routers/mainRouter');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
const wsServer = new ws.Server({ server });
const connections = [];

wsServer.on("connection", (connection) => {
    connections.push(connection);
    console.log("(+) new connection. total connections:", connections.length);

    connection.on("close", () => {
        connections.splice(connections.indexOf(connection), 1);
        console.log(
            "(-) connection lost. total connections:",
            connections.length
        );
    });
});

app.post("/toasts", (req, res) => {
    const message = req.body;
    notifyAll(message);
    res.send();
});

function notifyAll(message) {
    for (const connection of connections) {
        connection.send(JSON.stringify(message));
    } 
}

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_CONNECTION_STRING || '';
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const viewsDir = path.join(__dirname, 'views');
app.engine("mst", mustache(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('./public'))
app.use(morgan('dev'));
app.use('', mainRouter);
app.use((req, res) => {
    res.status(400).send({
        message: "Error in route."
    });
});

server.listen(port, async () => {
    try {
        console.log(`Server ready`);
        const client = await mongoose.connect(dbUrl, connectOptions);
        console.log('Mongo database connected');
    } catch (error) {
        console.log(`Server or db connection error`);
    }
});