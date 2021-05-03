"use strict";

// Modules npm
require('dotenv').config();

const app = require('./app.js');

// Déclaration de variables
var http = require('http');
const PORT = 8080;

// Lancement du serveur
http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
