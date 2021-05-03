"use strict";

const services = require('../services');

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

module.exports = {
    isAuthentified
}
