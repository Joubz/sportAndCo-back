"use strict";

const routes = require('./app/routes');
const services = require('./app/services');

// Modules npm
const helmet = require("helmet");
const express = require("express");
const app = express();
var compression = require('compression')

/**
 * Sécurité
 */
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter())

app.use(services.security.apiLimiter);

/**
 * Définition des CORS
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/**
 * Définition des limites de poids de requêtes
 */
app.use(compression())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use('/images', express.static('./images'));
app.use('/api/exemple', routes.exemple);
app.use('/api/equipment', routes.equipment);
app.use('/api/order', routes.order);
app.use('/api/category', routes.category);
app.use('/api/metropolises', routes.metropolises);
app.use('/api/payment', routes.payment);
app.use('/api/client', routes.client);
app.use('/api/admin', routes.admin);
app.use('/api/renter', routes.renter);

module.exports = app;
