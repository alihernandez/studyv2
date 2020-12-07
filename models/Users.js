const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const usersSchema = new Schema({
  firstname: {
    type: String,
    unique: false,
    required: true,
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  resetToken: String,
  expireToken: Date,
  admin: {
    type: Boolean,
    unique: false,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  Posts: [
    {
    type: Schema.Types.ObjectId,    
    ref: "Post"
  }
  ],
  Image: {
    type: String,
  },
});

usersSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.validPassword = (password, encrypted) => {
  return bcrypt.compareSync(password, encrypted);
};

const Users = mongoose.model('Users', usersSchema);
mongoose.set('useFindAndModify', false);

// Users.findOneAndUpdate({email: {}}, {firstname: 'German', password: usersSchema.methods.generateHash('Password2!')}, (error, data) => {
//   if(error) {
//     console.log(error)
//   } else {
//     console.log(data)
//   }
// })

module.exports = Users;
