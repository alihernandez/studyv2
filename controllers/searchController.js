const db = require("../models");

module.exports = {
  get: function (req, res) {
    console.log(req.params.id);
    db.Post.find({ subject: req.params.id })
      .populate("userId")
      .then((DBpost) => {
        res.json(DBpost);
      })
      .catch((err) => res.status(422).json(err));
  },

  subject: function (req, res) {
    // console.log(req.body);
    db.Post.find({})
      .populate("userId")
      .then((DBpost) => {
        // console.log(DBpost);
        res.json(DBpost);
      })
      .catch((err) => res.status(422).json(err));
  },
};
