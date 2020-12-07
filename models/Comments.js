const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentsSchema = new Schema({
  comment: { type: String, required: true },
  date: {type: Date , default: Date.now },
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users"
    },
  postId:
  {
    type: Schema.Types.ObjectId,    
    ref: "Post"
  }
});

const Comments = mongoose.model("Comments", commentsSchema);


module.exports = Comments;