"use strict";

const services = require('../services');
const jwt = require('jsonwebtoken');
const Validator = require('validatorjs');

/**
 * Vérifie les données passées en body pour la connexion de l'administrateur
 * @param {*} req Requête
 * @param {*} res Réponse
 * @param {*} next Passe la main au middleware suivant, au contrôleur sinon
 * @returns Une erreur si les données ne sont pas conformes
 */
const loginAdminControl = (req, res, next) => {
    const credentials = req.body;

    if (!credentials) {
        return services.exception.generateException(new services.exception.httpException('CLIENT_010'), res);
    }

    const data = {
        username: credentials.username,
        password: credentials.password
    };

    const rules = {
        username: 'required|string',
        password: 'required|string'
    };

    let validation = new Validator(data, rules);

    if (validation.fails()) {
        return services.exception.generateException(new services.exception.httpException('CLIENT_010'), res);
    }

    next();
};

/**
 * Vérifie le token de connexion de l'administrateur
 * @param {*} req Requête
 * @param {*} res Réponse
 * @param {*} next Passe la main au middleware suivant, au contrôleur sinon
 * @returns Une erreur si l'administrateur n'est pas authentifié
 */
const isAuthentifiedAdmin = (req, res, next) => {
    const token = req.headers["x-auth-token"];
    const ipClient = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(',')[0] : req.ip;

    if (!token) {
        return services.exception.generateException(new services.exception.httpException('CLIENT_006'), res);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err || decodedToken.ipClient !== ipClient) {
            return services.exception.generateException(new services.exception.httpException('CLIENT_006'), res);
        }

        req.userId = decodedToken.id;
        next();

    });
};

/**
 * Vérifie que l'utilisateur qui fait la requête est bien authentifié
 * @param {*} req Requête
 * @param {*} res Réponse
 * @param {*} next Passe la main au middleware suivant, au contrôleur sinon
 * @returns Une erreur si l'utilisateur n'est pas authentifié
 */
const isAuthentified = (req, res, next) => {
    let isAuthentified = true;

    if (req.headers["x-auth-token"]) {
        isAuthentifiedAdmin(req, res, next);
    }

    else if (!isAuthentified) {
        return services.exception.generateException(new services.exception.httpException('CLIENT_006'), res);
    }

    else {
        req.userId = 1;
        next();
    }
}

const loginRenterControl = (req, res, next) => {
	const credentials = req.body;

    if (!credentials) {
		return services.exception.generateException(new services.exception.httpException('CLIENT_010'), res);
	}

    const data = {
		username: credentials.email,
		password: credentials.password
	};

	const rules = {
		username: 'required|string',
		password: 'required|string'
	};

	next();
};

module.exports = {
    isAuthentified, 
    loginRenterControl,
    isAuthentifiedAdmin,
    loginAdminControl
}
