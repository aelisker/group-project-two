const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../../models');
const isAuth = require('../../utils/middleware/isAuth');
const passport = require('../../utils/passport');

router.get('/', (req, res) => {
  User.findAll({
    attributes: ['id', 'username', 'password', 'dark_mode']
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
      loggedIn: true,
      user_passport_obj: req.session.passport.user,
    })
  }
);

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    dark_mode: false
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

router.put('/', isAuth, (req, res) => {
  User.update(req.body, {
    where: {
      id: req.session.passport.user.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', isAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;