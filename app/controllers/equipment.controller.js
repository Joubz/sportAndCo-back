"use strict";

const services = require('../services');

/**
 * Recupère un équipement selon l'id passé
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou l'équipement trouvé
 */
const getEquipment = async (req, res) => {
    let foundExemple = [];

    try {
        foundExemple = await services.equipment.getEquipment(req.params.equipmentId);
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json(foundExemple);
};

/**
 * Récupère la liste des équipements
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des équipements
 * @returns L'erreur retournée par le service
 */

const getListEquipment = async (req, res) => {
    let listEquipments = [];

    try {
        listEquipments = await services.equipment.getListEquipment();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(listEquipments);
};

module.exports = {
    getEquipment,
    getListEquipment
}
