const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const GroupMessageSchema = new Schema({
  createTime: {
    type: Date,
    default: Date.now,
    index: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  email: String,
  type: {
    type: String,
    enum: ['text', 'image', 'code', 'url'],
    default: 'text',
  },
  content: {
    type: String,
    default: '',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const GroupMessage = mongoose.model('GroupMessage', GroupMessageSchema);

module.exports = GroupMessage;