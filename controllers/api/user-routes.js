const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../../models');
const passport = require('../../utils/passport');

router.get('/', (req, res) => {
  User.findAll({
    attributes: ['username', 'password']
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log('Logging in...')
//   .then(dbUserData => {
//     res.json(dbUserData);
//   })
// })

router.post('/login', passport.authenticate
  ('local'
  // , {
  //   successRedirect: '/',
  //   failureRedirect: '/login',
  //   failureFlash: true 
  //   }
  )
  , (req, res) => {
    res.json({
      username: req.body.username,
      password: req.body.password
    })
  }
);

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(dbUserData => {
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  //   req.session.save(() => {
  //     req.session.user_id = dbUserData.id;
  //     req.session.usename = dbUserData.usename;
  //     req.session.loggedIn = true;

  //     res.json(dbUserData);
  //   });
  // });
});

// router.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//   .then(dbUserData => {
//     if (!dbUserData) {
//       res.status(400).json({ message: 'An account with this username cannot be found. '});
//       return;
//     }

//     const validPassword = dbUserData.passwordValidation(req.body.password);
//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password. '});
//       return;
//     }
//     res.json({ user: dbUserData, message: 'You are now logged in.' });
//   });
// });

module.exports = router;