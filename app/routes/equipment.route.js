"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/:equipmentId", middlewares.auth.isAuthentified, controllers.equipment.getEquipment);

router.get("/getListEquipment", middlewares.auth.isAuthentified, controllers.equipment.getListEquipment);

module.exports = router;
