"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/list-category", middlewares.auth.isAuthentified, controllers.category.getListCategory);

module.exports = router;
