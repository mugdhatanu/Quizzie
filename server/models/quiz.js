const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const QuizSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true},
    impressions: {type: Number, required: true},
    questions: {type: [String], default: []}
},{timestamps: true});

module.exports = mongoose.model('quiz',QuizSchema);