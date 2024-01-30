const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ValueSchema = new Schema({
    text: {type: String},
    url: {type: String}
});

const OptionSchema = new Schema({
    value: {type: ValueSchema, required: true},
    timesSelected: {type: Number,default: 0}
});

const QuestionSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    questionName: {type: String, required: true},
    options: {type: [OptionSchema], required: true},
    answer: {type: ValueSchema},
    serialNum: {type: Number, default: 1},
    totalAttempts: {type: Number,default: 0},
    correctAttempts: {type: Number,default: 0},
    incorrectAttempts: {type: Number,default: 0}
}, {timestamps: true});

const QuizSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true},
    impressions: {type: Number, default: 0},
    quizType: {type: String, enum: ['Question','Poll'],required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User',required: true},
    optionsType: {type: String,enum: ['Text', 'Image','Text-Image'],required: true},
    timer: {type: String, enum: ["5", "10", "OFF"],required: true},
    questions: {type: [QuestionSchema], requried: true}
},{timestamps: true});

module.exports = mongoose.model('Quiz',QuizSchema);