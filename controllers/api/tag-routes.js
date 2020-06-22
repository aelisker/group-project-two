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
    tag_name: req.body.tag_name,
    user_id: req.session.passport.user.id
  })
  .then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', isAuth, (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;