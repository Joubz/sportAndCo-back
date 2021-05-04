"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/list", middlewares.auth.isAuthentified, controllers.exemple.getListExemple);

router.get('/:exempleId', middlewares.auth.isAuthentified, controllers.exemple.getExemple);

router.post("/", middlewares.auth.isAuthentified, controllers.exemple.addExemple);

router.put("/:exempleId", middlewares.auth.isAuthentified, controllers.exemple.editExemple);

router.delete("/:exempleId", middlewares.auth.isAuthentified, controllers.exemple.deleteExemple);

module.exports = router;
