"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/:orderId", middlewares.auth.isAuthentified, controllers.order.getOrder);

module.exports = router;
