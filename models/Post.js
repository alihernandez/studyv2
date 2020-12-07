const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new Schema({
  subject: { type: String, required: true },
  group: {type: Number, required: true},
  notes: {type: String},
  date: { type: Date, default: Date.now },
  location: {type: String},
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users"
    },
  Comments:[
    {
      type: Schema.Types.ObjectId,    
      ref: "Comments"
  }
  ]
});

const Post = mongoose.model("Post", postSchema);


module.exports = Post;
