// const db = require("../models/Users")

// module.exports = {
//     update: function(req,res){
//         console.log(req.body)
//         db.Users
//         .update(req.body) 
//         .then(res => db.User.findOneAndUpdate({_id: req.body.Userid}, { $push: { Password: res._id } }, { new: true },))
//         .then(dbUser => res.json(dbUser))
//         .catch(err => res.status(422).json(err))
//     }
// }