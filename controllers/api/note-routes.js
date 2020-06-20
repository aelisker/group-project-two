const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../../models');
const isAuth = require('../../utils/middleware/isAuth');

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

router.post('/', (req, res) => {
  Note.create({
    title: req.body.title,
    note_content: req.body.note_content,
    //user_id: req.session.user_id,
    user_id: req.body.user_id,
    tagIds: req.body.tag_id,
  })
  .then((note) => {
    if (req.body.tagIds.length) {
      const NoteTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          note_id: note.id, tag_id,
        };
      });
      return NoteTag.bulkCreate(NoteTagIdArr);
    }
    res.status(200).json(note);
  })
  .then((noteTagIds) => res.status(200).json(noteTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;