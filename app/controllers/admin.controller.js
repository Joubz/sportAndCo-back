"use strict";

const services = require('../services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

/**
 * Récupère les informations de l'administrateur et crée un nouveau JWT
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns une erreur, ou le token d'authentification de l'administrateur ainsi que ses informations
 */
const loginAdmin = async (req, res) => {
    let foundUser = [];

    let ipClient = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(',')[0] : req.ip;

    try {
        foundUser = await services.admin.loginAdmin(req.body.username);

        if (foundUser.length === 0) {
            throw new services.exception.httpException('CLIENT_016');
        }
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        foundUser[0].PASSWORD
    );

    if (!isPasswordValid) {
        return services.exception.generateException(new services.exception.httpException('CLIENT_016'), res);
    }

    const ADMINISTRATOR_TOKEN = jwt.sign(
        {
            id: foundUser[0].ADMINISTRATOR_ID,
            username: foundUser[0].LOGIN,
            ipClient
        },
        "jwt-secret",
        {
            expiresIn: "7d"
        }
    );

    res.status(200).json({
        id: foundUser[0].ADMINISTRATOR_ID,
        username: foundUser[0].LOGIN,
        authenticationToken: ADMINISTRATOR_TOKEN
    });
};

/**
 * Crée un nouvel utilisateur administrateur (actif seulement en mode dev)
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns une erreur ou une 200
 */
const createAdmin = async (req, res) => {
    const password = bcrypt.hashSync(md5(req.body.password), 8);

    try {
        await services.admin.createAdmin(req.body.username, password);
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
};

module.exports = {
    loginAdmin,
    createAdmin
}
