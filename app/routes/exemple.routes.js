"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get('/:exempleId', middlewares.auth.isAuthentified, controllers.exemple.getExemple);

module.exports = router;
