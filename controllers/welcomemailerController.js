//nodemailerController.js

let nodemailer = require("nodemailer");
const { addListener } = require("nodemon");
require("dotenv").config();
// const jwt = require('jsonwebtoken');



module.exports = {
  sendMail: async function (req, res) {
    console.log(req.user)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.REACT_APP_USER,
        pass: process.env.REACT_APP_PASS,
      },
    });
//  const payload = {email: req.body.email};

// const secret = 'mysecretsshhh';
//    const token = jwt.sign(payload, secret, {
//      expiresIn: '1h'
//    });
    // Message object
    let message = {
      from: "no-reply@studdy-buddy.app",

      // Comma separated list of recipients
      to: req.body.email,
      bcc: "",

      // Subject of the message
      subject: "Welcome to StuddyBuddy!!",

      // plaintext body
      text: "Thank you for signing up!",

      // HTML body
      html:
        "<p>Hello and welcome to StuddyBuddy!! Login Here!!" +
        `<p><link>http://localhost:3000/login</p>`,
    };

    let info = await transporter.sendMail(message);
    res.json(info);
    console.log("Message sent successfully as %s", info.messageId);
  },
  checkToken: function (req, res) {
    res.sendStatus(200);  
  }
};
