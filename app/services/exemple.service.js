"use strict";

const { transaction } = require("../../database");

/**
 * Récupère un exemple depuis la BDD
 * @param {*} id Identifiant de l'exemple
 * @returns L'exemple trouvé, une erreur sinon
 */
const getExemple = async (exempleId) => {

    const query = 'SELECT * ' +
        'FROM EXEMPLE ' +
        'WHERE EXEMPLE_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(exempleId));
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
 * Renvoie la liste d'exemple
 * @returns La liste des exemples
 */
const getListExemple = async () => {

    const query = 'SELECT * ' +
        'FROM EXEMPLE ';

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
 * Insère un exemple dans la BDD
 * @param {*} title Titre de l'exemple, description
 */
const addExemple = async (newExemple) => {

    const query =
        'INSERT INTO ' +
        'EXEMPLE ' +
        'SET ?';

    const params = [{
        TITLE: newExemple.title,
        DESCRIPTION: newExemple.description
    }];

    await transaction(async connection => {
        try {
            await connection.query(query, params);
        } catch (err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

}

/**
 * Modifie le contenu d'un exemple
 * @param {*} newsId Identifiant de l'exemple
 * @returns Une 200 ou une erreur
 */
const editExemple = async (exempleId, newExemple) => {

    const query = 'UPDATE EXEMPLE ' +
        'SET ? ' +
        'WHERE EXEMPLE_ID = ?'

    let [queryRes, fields] = [];
    const params = [
        {
            TITLE: newExemple.title,
            DESCRIPTION: newExemple.description
        },
        exempleId
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
 * Supprime un exemple
 * @param exempleId l'id de l'exemple à supprimer
 * @return {Promise<*>}
 */
const deleteExemple = async (exempleId) => {
    const query = 'DELETE FROM EXEMPLE ' +
        'WHERE EXEMPLE_ID = ? ';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(exempleId));
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
    getExemple,
    getListExemple,
    addExemple,
    editExemple,
    deleteExemple
}
