const router = require("express").Router();
const newsfeedController = require("../../controllers/newsfeedController");

router.route("/")
  .get(newsfeedController.get);

module.exports = router;