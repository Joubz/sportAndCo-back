"use strict";

const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/login-admin', middlewares.auth.loginAdminControl, controllers.admin.loginAdmin);

if (process.env.NODE_ENV === 'dev') {
    router.post('/create-admin', middlewares.auth.loginAdminControl, controllers.admin.createAdmin);
}

module.exports = router;
