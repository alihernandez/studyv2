const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProfilePicSchema = new Schema({
  profilePic: { type: String, required: true },
  date: {type: Date , default: Date.now },
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users"
    }
});

const ProfilePic = mongoose.model("ProfilePic", ProfilePicSchema);


module.exports = ProfilePic;