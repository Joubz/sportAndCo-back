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

/**
 * Récupère la liste des équipements selon les paramètres de recherche
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des équipements
 * @returns L'erreur retournée par le service
 */

const searchEquipment = async (req, res) => {
    let listEquipments = [];

    try {
        if(req.params.categoryId == 0 && req.params.metropolisesId == 0) {
            listEquipments = await services.search.searchEquipmentWithName(req.params.equipmentName, req.params.startDate, req.params.endDate);
        } else if (req.params.categoryId != 0 && req.params.metropolisesId == 0) {
            listEquipments = await services.search.searchEquipmentWithCategory(req.params.equipmentName, req.params.startDate, req.params.endDate, req.params.categoryId);
        } else if (req.params.categoryId == 0 && req.params.metropolisesId != 0) {
            listEquipments = await services.search.searchEquipmentWithMetropolises(req.params.equipmentName, req.params.startDate, req.params.endDate, req.params.metropolisesId);
        } else if (req.params.categoryId != 0 && req.params.metropolisesId != 0){
            listEquipments = await services.search.searchEquipmentWithCategoryAndMetropolises(req.params.equipmentName, req.params.startDate, req.params.endDate, req.params.categoryId, req.params.metropolisesId);
        }
    } catch(err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json(listEquipments);
};

const addEquipment = async (req, res) => {
    let newEquipment = req.body.newEquipment;

    try {
        if (newEquipment.imageLink1) {
            newEquipment.imageLink1 = await services.image.saveImage(newEquipment.imageLink1);
        }
        if (newEquipment.imageLink2) {
            newEquipment.imageLink2 = await services.image.saveImage(newEquipment.imageLink2);
        }
        if (newEquipment.imageLink3) {
            newEquipment.imageLink3 = await services.image.saveImage(newEquipment.imageLink3);
        }

        await services.equipment.addEquipment(newEquipment);

    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
};


module.exports = {
    getEquipment,
    getListEquipment,
    searchEquipment,
    addEquipment
}
