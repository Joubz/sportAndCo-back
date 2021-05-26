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

/**
 * Récupère une commande depuis la BDD
 * @param {*} equipmentId Identifiant de l'équipement concerné par la commande
 * @returns La commande trouvé, une erreur sinon
 */
const getOrderByEquipmentForAvailability = async (equipmentId) => {

    const query = 'SELECT ORDER_ID, BILL_ID, CLIENT_ID, EQUIPMENT_ID, RENTER_ID, START_DATE, END_DATE, QUANTITY_RENTED, STATUS_RENDERED ' +
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

/**
 * Récupère les commandes depuis la BDD qui concernent le client spécifié.
 * @param clentId Identifiant du client concerné.
 * @returns Les commandes trouvées, une erreur sinon.
 */
const getOrderListByClient = async (clentId) => {

    const query = 'SELECT * ' +
        'FROM ORDER_VIEW ' +
        'WHERE CLIENT_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(clentId));
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
    getOrderByEquipment,
    getOrderByEquipmentForAvailability,
    getOrderListByClient
}
