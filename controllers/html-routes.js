const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../models');
const passport = require('../utils/passport');
const isAuth = require('../utils/middleware/isAuth');

// const findNotes = () => {
//   return Note.findAll({
//     attributes: ['id', 'title', 'note_content', 'user_id', 'created_at'],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Tag,
//         attributes: ['tag_name']
//       }
//     ],
//     where: {
//       user_id: req.session.passport.user.id 
//     }
//   })
// }

// const findUser = (notes) => {

//   let data = {notes}

//   User.findOne({
//     attributes: ['dark_mode'],
//     where: {
//       id: req.session.passport.user.id 
//     }
//   })
//   .then(userData => {
//     data.userData = userData;
//     console.log(data);
//       return data;
//   })
// }

// router.get('/', (req, res) => {
//   // if (req.session.loggedIn) 
//   if (typeof req.session.passport != 'undefined')
//   {
//     findNotes()
//     .then(findUser)
//     .then(dbNoteData => {
//       console.log('NOTE DATA HERE' + dbNoteData);
//       const notes = dbNoteData.map(note => note.get({ plain: true }))
//       res.render('homepage', {
//         notes,
//         loggedInId: req.session.passport.user.id,
//         // darkMode: dbNoteData.session.passport.user.dark_mode
//         darkMode: req.session.passport.user.dark_mode
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
//   } else {
//     res.render('login');
//   }
// });


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

module.exports = router;