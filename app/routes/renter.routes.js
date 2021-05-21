"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.post('/create-renter', controllers.renter.createRenter);

module.exports = router;
