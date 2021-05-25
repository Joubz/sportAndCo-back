"use strict";

const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/not-accept-list', middlewares.auth.isAuthentifiedAdmin, controllers.renter.getNotAcceptList);

router.put("/accept-renter/:renterId", middlewares.auth.isAuthentifiedAdmin, controllers.renter.acceptRenter);

router.delete("/:renterId", middlewares.auth.isAuthentifiedAdmin, controllers.renter.deleteRenter);

module.exports = router;
