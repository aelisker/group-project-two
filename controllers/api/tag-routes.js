const router = require('express').Router();
const { User, Note, Tag, NoteTag } = require('../../models');
const isAuth = require('../../utils/middleware/isAuth');

router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Note,
      attributes: ['id', 'title', 'note_content', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;