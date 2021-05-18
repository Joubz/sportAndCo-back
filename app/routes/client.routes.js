"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get('/list-mail', controllers.client.getListMailClient);

router.post('/create-client', controllers.client.createClient);

module.exports = router;
