const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../../models');
const isAuth = require('../../utils/middleware/isAuth');
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
      password: req.body.password,
      loggedIn: true
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

module.exports = router;