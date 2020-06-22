const User = require('./User');
const Note = require('./Note');
const Tag = require('./Tag');
const NoteTag = require('./NoteTag');

User.hasMany(Note, {
  foreignKey: 'user_id'
});

Note.belongsTo(User, {
  foreignKey: 'user_id'
});

Note.belongsToMany(Tag, {
  through: NoteTag,
  foreignKey: 'note_id'
});

Tag.belongsToMany(Note, {
  through: NoteTag,
  foreignKey: 'tag_id'
});

User.hasMany(Tag, {
  foreignKey: 'user_id'
});

Tag.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Note, Tag, NoteTag };