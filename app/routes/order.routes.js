"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/:orderId", middlewares.auth.isAuthentified, controllers.order.getOrder);

router.get("/order-by-equipment/:equipmentId", middlewares.auth.isAuthentified, controllers.order.getOrderByEquipment);

router.get("/order-by-equipment-available/:equipmentId", middlewares.auth.isAuthentified, controllers.order.getOrderByEquipmentForAvailability);

router.post("/add-order", middlewares.auth.isAuthentified, controllers.order.postOrder);

router.get("/order-by-client/:clientId", middlewares.auth.isAuthentified, controllers.order.getOrderListByClient);

module.exports = router;
