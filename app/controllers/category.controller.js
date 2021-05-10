"use strict";

const services = require('../services');

/**
 * Récupère la liste des catégories
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des catégories
 * @returns L'erreur retournée par le service
 */

const getListCategory = async (req, res) => {
    let listCategory = [];

    try {
        listCategory = await services.category.getListCategory();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(listCategory);
};

module.exports = {
    getListCategory
}
