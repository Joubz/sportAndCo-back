"use strict";

const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/list', controllers.renter.getRenterList);

router.get('/not-accept-list', controllers.renter.getNotAcceptList);

router.put("/accept-renter/:renterId",  controllers.renter.acceptRenter);

router.delete("/:renterId/:renterFirstName/:renterLastName/:renterMail/:companyName",  controllers.renter.deleteRenter);

module.exports = router;
