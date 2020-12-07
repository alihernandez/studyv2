const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  zodiac: { type: String },
  level: { type: String },
  // avatar: { type: File },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", UserProfileSchema);

module.exports = User;
