const db = require("../models");

module.exports = {
  create: function (req, res) {
    // console.log(req.body)
    db.ProfilePic.create(req.body)
      .then((dbPost) => res.json(dbPost))
      .catch((err) => res.status(422).json(err));
  },
};
