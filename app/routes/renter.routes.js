"use strict";

const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const router = express.Router();

router.get('/list-mail', controllers.renter.getListMailRenter);

router.get('/list', controllers.renter.getRenterList);

router.get('/not-accept-list', controllers.renter.getNotAcceptList);

router.get("/get-by-equipment/:equipmentId", controllers.renter.getRenterByEquipment);

router.put("/accept-renter/:renterId",  controllers.renter.acceptRenter);

router.post('/create-renter', controllers.renter.createRenter);

router.post('/login', middlewares.auth.loginRenterControl, controllers.renter.loginRenter);

router.delete("/:renterId/:renterFirstName/:renterLastName/:renterMail/:companyName",  controllers.renter.deleteRenter);

module.exports = router;
