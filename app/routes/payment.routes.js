"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get("/:clientId", middlewares.auth.isAuthentified, controllers.payment.getCardPayment);

router.get("/:clientId", middlewares.auth.isAuthentified, controllers.payment.getCardPayment);

router.post("/add-card", middlewares.auth.isAuthentified, controllers.payment.postCardPayment);

module.exports = router;
