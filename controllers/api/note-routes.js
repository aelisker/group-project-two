const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../../models');
const isAuth = require('../../utils/middleware/isAuth');
const passport = require('../../utils/passport');
const e = require('express');
const { json } = require('body-parser');

router.get('/', (req, res) => {
  Note.findAll({
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
    ]
  })
  .then(dbNoteData => res.json(dbNoteData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', isAuth, (req, res) => {
  Note.create({
    title: req.body.title,
    note_content: req.body.note_content,
    user_id: req.session.passport.user.id,
    tagIds: req.body.tag_id,
  })
  .then((note) => {
    if (typeof req.body.tagIds != 'undefined') {
      if (req.body.tagIds.length) {
        const NoteTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            note_id: note.id, tag_id,
          };
        });
        return NoteTag.bulkCreate(NoteTagIdArr);
      }
    }
    res.status(200).json(note);
  })
  .then((noteTagIds) => res.status(200).json(noteTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', isAuth, (req, res) => {
  Note.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbNoteData => {
    if (!dbNoteData) {
      res.status(404).json({ message: 'No note found with this ID' });
      return;
    }
    res.json(dbNoteData);
  })
  .catch((err) => {
    console.log(err);
    json.status(500).json(err);
  });
});

module.exports = router;