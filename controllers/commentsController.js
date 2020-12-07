const db = require("../models")

module.exports = {
    create: function(req,res){
        db.Comments
        .create(req.body) 
        .then(res => db.Post.findOneAndUpdate({_id: req.body.postid}, { $push: { Comments: res._id } }, { new: true },))
        .then(dbPost => res.json(dbPost))
        .catch(err => res.status(422).json(err))
    },
    getComments: function (req,res) {
        console.log( req.params.id)
        db.Comments     
        .find({postId: req.params.id})
        .populate("userId")
        .sort({date: -1})
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }
}