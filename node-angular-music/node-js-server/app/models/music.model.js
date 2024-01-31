const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  music_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;