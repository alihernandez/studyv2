//A route is a section of Express code that associates an HTTP verb ( GET , POST , PUT , DELETE , etc.), a URL path/pattern, and a function that is called to handle that pattern.
const router = require("express").Router("")
const { get } = require("mongoose");
const nodemailerController = require("../controllers/nodemailerController");
const withAuth = require('../config/middleware/middleware');

router.route("/sendReset")
  .post(nodemailerController.sendReset);

  router.route("/checkToken/:token")
       .get(withAuth, nodemailerController.checkToken)


// router.route("/protected").get(nodemailerController.sendJWT);

module.exports = router;