"use strict";

const services = require('../services');

/**
 * Récupère l'exemple dont l'id est passé en paramètre de la route
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'exemple demandé / une erreur sinon
 */
const getExemple = async (req, res) => {
    let foundExemple = [];

    try {
        foundExemple = await services.exemple.getExemple(req.params.exempleId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundExemple);
};

module.exports = {
    getExemple
}
