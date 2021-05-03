"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', middlewares.auth.isAuthentified, controllers.exemple.getExemple);
