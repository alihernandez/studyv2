const db = require("../models");

module.exports = {
  get: function (req, res) {
    db.Post.find({})
      .populate("userId")
      .sort({ date: -1 })
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
