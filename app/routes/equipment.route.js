"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();



router.get("/getListEquipment", middlewares.auth.isAuthentified, controllers.equipment.getListEquipment);

router.get("/:equipmentId", middlewares.auth.isAuthentified, controllers.equipment.getEquipment);


module.exports = router;
