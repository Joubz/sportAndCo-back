"use strict";

const services = require('../services');

/**
 * Récupère la liste des métropoles
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des métropoles
 * @returns L'erreur retournée par le service
 */

const getListMetropolises = async (req, res) => {
    let listMetropolises = [];

    try {
        listMetropolises = await services.metropolises.getListMetropolises();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(listMetropolises);
};

module.exports = {
    getListMetropolises
}
