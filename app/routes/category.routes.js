"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/list-category", middlewares.auth.isAuthentified, controllers.category.getListCategory);

router.get("/get-by-equipment/:equipmentId", middlewares.auth.isAuthentified, controllers.category.getCategoryByEquipment);

module.exports = router;
