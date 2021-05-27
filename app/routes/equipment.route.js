"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/list-equipment", middlewares.auth.isAuthentified, controllers.equipment.getListEquipment);

router.get("/search-equipment/:equipmentName/:startDate/:endDate/:categoryId/:metropolisesId", middlewares.auth.isAuthentified, controllers.equipment.searchEquipment);

router.get("/:equipmentId", middlewares.auth.isAuthentified, controllers.equipment.getEquipment);

router.post("/", controllers.equipment.addEquipment);

module.exports = router;
