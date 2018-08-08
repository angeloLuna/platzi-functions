const functions = require('firebase-functions');
const nodemailer = require('nodemailer');


const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  }
});

const APP_NAME = "Firebase Functions con Gmail";

exports.sendWElcomeEmail = functions.auth.user().onCreate((user) =>{
  const email = user.email;
  const displayName = user.displayName

  return sendWElcomeEmail(email,displayName);
})

exports.sendByEmail = functions.auth.user().onDelete((user) =>{
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName)
})

function sendWelcomeEmail(email, displayName){
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  }

  mailOptions.subject = `Bienvenido a ${APP_NAME}`;
  mailOptions.text =  `hey ${displayName} Bienvenido a ${APP_NAME}. Esperamos que disfrutes de nuestro servicio`;
  return  mailTransport.sendMail(mailOptions).then(()=>{
    return console.log("correo enviado");
  })
}

function sendGoodbyeEmail(email, displayName){
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  }

  mailOptions.subject = `Adiós`;
  mailOptions.text =  `hey ${displayName} te vamos a extrañar`;
  return  mailTransport.sendMail(mailOptions).then(()=>{
    return console.log("correo enviado");
  })
}

