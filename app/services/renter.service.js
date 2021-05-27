"use strict";

const { transaction } = require("../../database");

/**
 * Récupère tout les loueurs
 * @return queryRes la liste des loueurs trouvés
 */
const getRenterList = async () => {
    const query =
        'SELECT * ' +
        'FROM RENTER ';

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

/**
 * Récupère tout les loueurs non acceptés
 * @return queryRes la liste des loueurs trouvés
 */
const getNotAcceptList = async () => {
    const query =
        'SELECT * ' +
        'FROM RENTER ' +
        'WHERE ACCEPTED = 0';

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

/**
 * Accepte un loueur
 * @param {*} renterId Identifiant du loueur
 * @returns Une 200 ou une erreur
 */
const acceptRenter = async (renterId) => {

    const query = 'UPDATE RENTER ' +
        'SET ? ' +
        'WHERE RENTER_ID = ?'

    let [queryRes, fields] = [];
    const params = [
        {
            ACCEPTED: 1
        },
        renterId
    ];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, params);
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
 * Supprime un loueur
 * @param renterId l'id du loueur à supprimer
 * @return {Promise<*>}
 */
const deleteRenter = async (renterId) => {
    const query = 'DELETE FROM RENTER ' +
        'WHERE RENTER_ID = ? ';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(renterId));
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
 * Récupère le loueur associé à l'équipement
 * @param equipmentId l'id de l'équipement
 * @return Le loueur de l'équipement trouvé
 */
const getRenterByEquipment = async (equipmentId) => {
    const query =
        'SELECT renter.* ' +
        'FROM RENTER ' +
        'JOIN EQUIPMENT ' +
        'ON RENTER.RENTER_ID = EQUIPMENT.RENTER_ID ' +
        'WHERE EQUIPMENT.EQUIPMENT_ID = ?';

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
    getNotAcceptList,
    acceptRenter,
    deleteRenter,
    getRenterList,
    getRenterByEquipment
}
