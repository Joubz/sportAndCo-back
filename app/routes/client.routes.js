"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.post('/login', controllers.client.loginClient);

router.post('/create-client', controllers.client.createClient);

module.exports = router;
