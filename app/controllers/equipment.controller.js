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

module.exports = {
    getEquipment
}
