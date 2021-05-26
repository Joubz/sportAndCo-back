"use strict";

const { transaction } = require('../../database');

/**
 * Récupère les informations de l'administrateur
 * @param {*} username Nom d'utilisateur de l'administrateur
 * @returns une erreur ou les informations de l'administrateur
 */
const loginAdmin = async (username) => {
    const query = 'SELECT * FROM ADMINISTRATOR WHERE LOGIN = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, username);
        } catch(err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

    return queryRes;
};

/**
 * Crée un nouvel administrateur en base. Actif seulement en mode dev
 * @param {*} username Nom d'utilisateur du nouvel administrateur
 * @param {*} password Mot de passe du nouvel administrateur
 */
const createAdmin = async (username, password) => {
    const query = 'INSERT INTO ADMINISTRATOR SET ?';
    const params = [{
        LOGIN: username,
        PASSWORD: password
    }];

    await transaction(async connection => {
        try {
            await connection.query(query, params);
        } catch(err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });
};

module.exports = {
    loginAdmin,
    createAdmin
}
