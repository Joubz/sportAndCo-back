"use strict";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sport.and.co.33@gmail.com',
        pass: 'sport&co33'
    }
});

const sendConfirmationMail = async (clientFirstName, clientLastName, clientMail) => {
    const mailOptions = {
        from: 'sport.and.co.33@gmail.com',
        to: clientMail,
        subject: 'Sport&Co : Compte crée',
        text: 'Bonjour ' + clientFirstName + ' ' + clientLastName + '\n' + 'Votre compte sur Sport&Co à été créer.'
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
    sendConfirmationMail
}
