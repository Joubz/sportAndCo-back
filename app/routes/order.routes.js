"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/:orderId", middlewares.auth.isAuthentified, controllers.order.getOrder);

router.get("/order-by-equipment/:equipmentId", middlewares.auth.isAuthentified, controllers.order.getOrderByEquipment);

module.exports = router;
