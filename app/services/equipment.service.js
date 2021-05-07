"use strict";

const { transaction } = require("../../database");

/**
 * Récupère un équipement depuis la bdd
 * @param equipmentId id de l'équipement
 * @return queryRes l'équipement trouvé
 */
const getEquipment = async (equipmentId) => {
    const query =
        'SELECT * ' +
        'FROM EQUIPMENT_VIEW ' +
        'WHERE EQUIPMENT_ID = ? ';

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
 * Récupère tous les équipements depuis la bdd
 * @return queryRes la liste des équipements trouvés
 */
const getListEquipment = async () => {
    const query =
        'SELECT ' +  'EQUIPMENT_ID, EQUIPMENT_NAME, PRICE, IMAGE_LINK_1 ' +
        'FROM EQUIPMENT';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query);
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
    getEquipment,
    getListEquipment
}
