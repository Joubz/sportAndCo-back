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

module.exports = {
    getEquipment
}
