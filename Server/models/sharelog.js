const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sharelog = new Schema({
    userId: String,
    medId: String,
    status: Boolean
});

module.exports = mongoose.model('sharelog', sharelog);
