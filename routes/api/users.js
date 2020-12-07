/* eslint-disable no-unused-vars */
const router = require('express').Router();
const passport = require('../../config/passport');
const db = require('../../models');
const authMiddleware = require('../../config/middleware/authMiddleware');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/users/unauthorized',
    failureFlash: true,
  }),
  (req, res) => {
    console.log('sign in successful');
    console.log(req.user)
    res.json({
      user: req.user,
      loggedIn: true,
    });
  },
);

router.post('/resetPass', (req, res) => {

  console.log(req.body.reset, req.body.email)

  db.User.findOne({email: req.body.email}).then(function (results){


    const newUser = new db.User({
      firstname: results.firstname,
      lastname: results.lastname,
      email: results.email,
      username: results.username,
      password: results.password
    });
    newUser.password = newUser.generateHash(req.body.reset);

    console.log(newUser.password)

      db.User.findOneAndUpdate({email:req.body.email}, {password: newUser.password}, (error, data) => {
    if(error) {
      console.log(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })

   
    // newUser.password = newUser.generateHash(req.body.password);
    // console.log("newUser", newUser)
    // res.json(newUser.password)
  
  })


  
})

router.post('/signup', (req, res, next) => {
  db.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log('user already exists');
      return res.json('user already exists');
    }
    if (!user) {
      db.User.findOne({ email: req.body.email }, (error, useremail) => {
        if (error) throw error;
        if (useremail) {
          return res.json('email is already in use');
        }
        if (!useremail) {
          const newUser = new db.User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            Image: req.body.Image
          });
          newUser.password = newUser.generateHash(req.body.password);
          newUser.save((error2) => {
            if (error2) throw error2;
            console.log('user saved!');
            res.redirect(307, '/api/users/login');
          });
        }
      });
    }
  });
});

// router.put('/user', (req, res, next) => {
//   db.User.findOneandUpdate({ id: req.user.id }, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//       console.log('error user');
//       return res.json('error user');
//     }
//     if (user) {
//       db.User.findOne({email: user.email}, (error, user) => {
//         if (error) throw error;
      
      
//           user.password = newUser.generateHash(req.body.password);
//           user.save((error2) => {
//             if (error2) throw error2;
//             console.log('user saved!');
//             res.redirect(307, '/api/users/login');
//           });
//         }
//       });
//     }
//   });
// }); 

router.get('/unauthorized', (req, res, next) => {
  res.json({
    error: req.flash('error'),
    message: 'user not authenticated',
  });
});

router.get('/profile', authMiddleware.isLoggedIn, (req, res, next) => {
  res.json({
    user: req.user,
    loggedIn: true,
  });
});



router.get('/logout', authMiddleware.logoutUser, (req, res, next) => {
  res.json('User logged out successfully');
});

router.get('/admin', authMiddleware.isAdmin, (req, res, next) => {
  res.json({
    user: req.user,
    loggedIn: true,
  });
});

module.exports = router;
