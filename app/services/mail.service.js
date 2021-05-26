"use strict";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'sport.and.co.33@gmail.com',
        pass: 'sport&co33'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendClientConfirmationMail = async (clientFirstName, clientLastName, clientMail) => {
    const mailOptions = {
        from: 'sport.and.co.33@gmail.com',
        to: clientMail,
        subject: 'Sport&Co : Compte crée',
        text: 'Bonjour ' + clientFirstName + ' ' + clientLastName + '\n' + 'Votre compte sur Sport&Co a été créer.'
    };

    try {
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                throw new Error(error);
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}
const sendOrderConfirmationMail = async (clientFirstName, clientLastName, clientMail, equipmentName, equipmentQuantity, price) => {
    const mailOptions = {
        from: 'sport.and.co.33@gmail.com',
        to: clientMail,
        subject: 'Sport&Co : Confirmation de commande',
        text: 'Bonjour ' + clientFirstName + ' ' + clientLastName + '\n' + 'Votre commande sur Sport&Co contenant : ' + equipmentQuantity + ' '
            + equipmentName + ' pour ' + price + '€' + ' a été confirmé.'
    };

    try {
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                throw new Error(error);
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}

const sendRenterAcceptConfirmationMail = async (renterFirstName, renterLastName, renterMail, companyName) => {
    const mailOptions = {
        from: 'sport.and.co.33@gmail.com',
        to: renterMail,
        subject: 'Sport&Co : Compte loueur accepté',
        text: 'Bonjour ' + renterFirstName + ' ' + renterLastName + '\n' + 'Votre compte sur Sport&Co pour votre entreprise ' + companyName  + ' a été validé par l\'administration.'
    };

    try {
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                throw new Error(error);
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}

const sendRenterDeleteConfirmationMail = async (renterFirstName, renterLastName, renterMail, companyName) => {
    const mailOptions = {
        from: 'sport.and.co.33@gmail.com',
        to: renterMail,
        subject: 'Sport&Co : Compte loueur refusé',
        text: 'Bonjour ' + renterFirstName + ' ' + renterLastName + '\n' + 'Votre compte sur Sport&Co pour votre entreprise ' + companyName  + ' a été refusé par l\'administration.' + '\n' +
            'En conséquence, ce dernier à été supprimer.'
    };

    try {
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                throw new Error(error);
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    sendClientConfirmationMail,
    sendOrderConfirmationMail,
    sendRenterAcceptConfirmationMail,
    sendRenterDeleteConfirmationMail
}
