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