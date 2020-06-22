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

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('PASSPORT GOES HERE', req.session.passport);
  // res.redirect('/');
  res.render('homepage', {
    loggedInId: req.session.passport.user.id,
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  })
});

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
});

router.put('/dmon', isAuth, (req, res) => {
  User.update({
    dark_mode: true
  }, 
  {
    where: {
      id: req.session.passport.user.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    req.session.darkMode = true;
    req.logIn(req.session.passport.user, function(error) {
      if (!error) {
          // successfully serialized user to session
      }
      res.json(dbUserData);
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/dmoff', isAuth, (req, res) => {
  User.update({
    dark_mode: false
  }, 
  {
    where: {
      id: req.session.passport.user.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    req.session.darkMode = false;
    req.logIn(req.session.passport.user, function(error) {
      if (!error) {
          // successfully serialized user to session
      }
      res.json(dbUserData);
    })
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