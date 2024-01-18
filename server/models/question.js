const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    value: {type: String, required: true},
    timesSelected: {type: Number }
});

const QuestionSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    options: {type: [OptionSchema], required: true},
    optionType: {type: String,enum: ['Text', 'Image','Text-Image'],required: true},
    questionType: {type: String, enum: ['Question','Poll'],required: true},
    answer: {type: String, required: true},
    totalAttempts: {type: Number},
    correctAttempts: {type: Number},
    incorrectAttempts: {type: Number}
}, {timestamps: true});

module.exports = mongoose.model('question',QuestionSchema);