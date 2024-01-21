const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    value: {type: String, required: true},
    timesSelected: {type: Number,default: 0}
});

const QuestionSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    options: {type: [OptionSchema], required: true},
    answer: {type: String, required: true},
    totalAttempts: {type: Number,default: 0},
    correctAttempts: {type: Number,default: 0},
    incorrectAttempts: {type: Number,default: 0}
}, {timestamps: true});

const QuizSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true},
    impressions: {type: Number, default: 0},
    quizType: {type: String, enum: ['Question','Poll'],required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    optionsType: {type: String,enum: ['Text', 'Image','Text-Image'],required: true},
    timer: {type: String, enum: ["5", "10", "OFF"],required: true},
    questions: {type: [QuestionSchema], requried: true}
},{timestamps: true});

module.exports = mongoose.model('Quiz',QuizSchema);