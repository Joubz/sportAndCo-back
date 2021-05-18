"use strict";

const { transaction } = require("../../database");

/**
 * Crée un nouveau client en base.
 * @param {*} newClient Le client reçu
 */
const createClient = async (newClient) => {
  const query = "INSERT INTO CLIENT SET ?";

  const params = [
    {
      PASSWORD: newClient.password,
      FIRST_NAME: newClient.firstName,
      LAST_NAME: newClient.lastName,
      EMAIL: newClient.email,
      PHONE: newClient.phone,
      BIRTH_DATE: newClient.birthDate,
      ADDRESS: newClient.address,
      ADDITIONAL_ADDRESS: newClient.additionalAddress,
      POSTAL_CODE: newClient.postalCode,
      CITY: newClient.city,
    },
  ];

  await transaction(async (connection) => {
    try {
      await connection.query(query, params);
    } catch (err) {
      throw new Error(err);
    }
  }).catch((err) => {
    throw err;
  });
};

/**
 * Récupère les informations du client
 * @param {*} email du client
 * @returns une erreur ou les informations du client
 */
const loginClient = async (email) => {
  const query = "SELECT * FROM CLIENT WHERE EMAIL = ?";

  let [queryRes, fields] = [];

  await transaction(async (connection) => {
    try {
      [queryRes, fields] = await connection.query(query, email);
    } catch (err) {
      throw new Error(err);
    }
  }).catch((err) => {
    throw err;
  });

  return queryRes;
};

/**
 * Récupère tous les mails des clients depuis la bdd
 * @return queryRes la liste des mails trouvés
 */
const getListMailClient = async () => {
    const query =
        'SELECT EMAIL ' +
        'FROM CLIENT';

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
  createClient,
  loginClient,
  getListMailClient
}
