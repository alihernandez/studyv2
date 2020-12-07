const router = require("express").Router("")
const { get } = require("mongoose");
const welcomemailerController = require("../controllers/welcomemailerController");

router.route("/sendMail")
  .post(welcomemailerController.sendMail);



module.exports = router;