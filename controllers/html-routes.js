const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../models');
const passport = require('../utils/passport');
const isAuth = require('../utils/middleware/isAuth');

router.get('/', (req, res) => {
  // if (req.session.loggedIn) 
  if (typeof req.session.passport != 'undefined')
  {
    return Note.findAll({
      attributes: ['id', 'title', 'note_content', 'user_id', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ],
      where: {
        user_id: req.session.passport.user.id 
      }
    })
    .then(dbNoteData => {
      console.log('SESSION INFO HERE' + JSON.stringify(req.session));
      if (typeof req.session.first === 'undefined') {
        req.session.first = false;
        req.session.darkMode = req.session.passport.user.dark_mode;
        console.log('FIRST SESSION' + JSON.stringify(req.session));
      } else {
        console.log('NOT FIRST SESSION' + JSON.stringify(req.session));
      }

      const notes = dbNoteData.map(note => note.get({ plain: true }))
      res.render('homepage', {
        notes,
        loggedInId: req.session.passport.user.id,
        // darkMode: dbNoteData.session.passport.user.dark_mode
        darkMode: req.session.darkMode
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  } else {
    res.render('login');
  }
});

router.get('/login', (req, res) => {
  console.log(req.session);
  if (typeof req.session.passport != 'undefined') {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/create-account', (req, res) => {
  if (typeof req.session.passport != 'undefined') {
    res.redirect('/');
    return;
  }
  res.render('create-account');
});

router.get('/tags', isAuth, (req, res) => {
  // if (typeof req.session.passport != 'undefined') {
  //   res.redirect('/');
  //   return;
  // }
  return Tag.findAll({
    attributes: ['id', 'tag_name'],
    where: {
      user_id: req.session.passport.user.id 
    }
  })
  .then(dbTagData => {

    const tags = dbTagData.map(tag => tag.get({ plain: true }))
    res.render('tags', {
      tags,
      loggedInId: req.session.passport.user.id,
      darkMode: req.session.darkMode
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/create-note', isAuth, (req, res) => {
  if (typeof req.session.passport === 'undefined') {
    res.redirect('/');
    return;
  }
  res.render('create-note', {
    loggedInId: req.session.passport.user.id,
    darkMode: req.session.darkMode
  });
});

module.exports = router;