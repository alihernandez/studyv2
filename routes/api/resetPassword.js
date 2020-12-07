const router = require("express").Router();
const resetController = require("../../controllers/resetController");

router.route("/")
  .post(resetController.create);

module.exports = router;