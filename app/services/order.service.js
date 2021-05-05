"use strict";

const { transaction } = require("../../database");

/**
 * Récupère une commande depuis la BDD
 * @param {*} orderId Identifiant de la commande
 * @returns La commande trouvé, une erreur sinon
 */
const getOrder = async (orderId) => {

    const query = 'SELECT * ' +
        'FROM ORDER_VIEW ' +
        'WHERE ORDER_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(orderId));
        } catch (err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

    return queryRes;
}

/**
 * Récupère une commande depuis la BDD
 * @param {*} equipmentId Identifiant de l'équipement concerné par la commande
 * @returns La commande trouvé, une erreur sinon
 */
const getOrderByEquipment = async (equipmentId) => {

    const query = 'SELECT * ' +
        'FROM ORDER_VIEW ' +
        'WHERE EQUIPMENT_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(equipmentId));
        } catch (err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

    return queryRes;
}

module.exports = {
    getOrder,
    getOrderByEquipment
}
