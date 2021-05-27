"use strict";

const { transaction } = require("../../database");

/**
 * Crée un nouveau loueur en base.
 * @param {*} newRenter Le loueur reçu
 */
const createRenter = async (newRenter) => {
  const query = "INSERT INTO RENTER SET ?";

  const params = [
    {
      COMPANY_NAME: newRenter.companyName,
      FIRST_NAME: newRenter.firstName,
      LAST_NAME: newRenter.lastName,
      EMAIL: newRenter.email,
      PASSWORD: newRenter.password,
      PHONE: newRenter.phone,
      BIRTH_DATE: newRenter.birthDate,
      ADDRESS: newRenter.address,
      ADDITIONAL_ADDRESS: newRenter.additionalAddress,
      POSTAL_CODE: newRenter.postalCode,
      CITY: newRenter.city,
      IMAGE_LINK: newRenter.imageLink,
      METROPOLISES_ID: newRenter.metropolises.id,
      ACCEPTED: newRenter.isAccepted
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
 * Récupère tous les mails des loueurs depuis la bdd
 * @return queryRes la liste des mails trouvés
 */
 const getListMailRenter = async () => {
  const query =
      'SELECT EMAIL ' +
      'FROM RENTER';

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
 * Vérifie la présence du loueur en BDD
 * @param {*} email 
 * @returns 
 */
const loginRenter = async (email) => {
  const query = 'SELECT * FROM RENTER WHERE email = ?';

  let [queryRes, fields] = [];

  await transaction(async connection => {
    try {
      [queryRes, fields] =  await connection.query(query, email);
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
    createRenter,
    getListMailRenter,
    loginRenter,
    getNotAcceptList,
    acceptRenter,
    deleteRenter,
    getRenterList,
    getRenterByEquipment

}
