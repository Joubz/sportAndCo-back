"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get('/list-mail', controllers.renter.getListMailRenter);

router.post('/create-renter', controllers.renter.createRenter);

router.post('/login', middlewares.auth.loginRenterControl, controllers.renter.loginRenter);

router.get('/list', controllers.renter.getRenterList);

router.get('/not-accept-list', controllers.renter.getNotAcceptList);

router.put("/accept-renter/:renterId",  controllers.renter.acceptRenter);

router.delete("/:renterId/:renterFirstName/:renterLastName/:renterMail/:companyName",  controllers.renter.deleteRenter);

module.exports = router;
