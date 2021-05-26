"use strict";

const services = require('../services');

/**
 * Récupère la commande dont l'id est passé en paramètre de la route
 * @param req Requête
 * @param res Réponse
 * @return La commande demandé / une erreur sinon
 */
const getOrder = async (req, res) => {
    let foundOrder = [];

    try {
        foundOrder = await services.order.getOrder(req.params.orderId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundOrder);
};

/**
 * Récupère la commande dont l'id de l'équipement est passé en paramètre de la route
 * @param req Requête
 * @param res Réponse
 * @return La commande demandé / une erreur sinon
 */
const getOrderByEquipment = async (req, res) => {
    let foundOrder = [];

    try {
        foundOrder = await services.order.getOrderByEquipment(req.params.equipmentId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundOrder);
};

/**
 * Récupère la commande dont l'id de l'équipement est passé en paramètre de la route
 * @param req Requête
 * @param res Réponse
 * @return La commande demandé / une erreur sinon
 */
const getOrderByEquipmentForAvailability = async (req, res) => {
    let foundOrder = [];

    try {
        foundOrder = await services.order.getOrderByEquipmentForAvailability(req.params.equipmentId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundOrder);
};

/**
 * Récupère les commandes dont l'id de client est passé en paramètre de la route
 * @param req Requête
 * @param res Réponse
 * @return Les commandes demandées / une erreur sinon
 */
const getOrderListByClient = async (req, res) => {
    let foundOrderList = [];

    try {
            foundOrderList = await services.order.getOrderListByClient(req.params.clientId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundOrderList);
};

module.exports = {
    getOrder,
    getOrderByEquipment,
    getOrderByEquipmentForAvailability,
    getOrderListByClient
}
