"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/list-metropolises", middlewares.auth.isAuthentified, controllers.metropolises.getListMetropolises);

module.exports = router;
