const Quiz = require('./../models/quiz');
const {poll,qna} = require('./../utils/analytics');



const getAllQuizzes = async(req,res,next) => {
    const {_id: user_id} = req["headers"].user;
    try {
        const quizzes = await Quiz.find({userId: user_id});
        res.status(200).json(quizzes);
    } catch(err) {
        next(err);
    }
}

const getQuizDetails = async(req,res,next) => {
    const {quiz_id} = req.params;
    try {
        const quiz = await Quiz.findOne({_id: quiz_id});
        if(quiz) {
            res.status(200).json(quiz);
        } else {
            const error = new Error("Quiz not found");
            error.status = 404;
            next(error);
        }
    } catch(err) {
        next(err);
    }
}

const totalImpressions = async(req,res,next) => {
    try {
        const quizzes = await Quiz.find({});
        let impressions = 0;
        if(quizzes.length) {
            for(const quiz of quizzes) {
                impressions += quiz.impressions;
            }
        }
        res.status(200).json({impressions});
    } catch(err) {
        next(err);
    }
}

const increaseQuizImpressions = async(req,res,next) => {
    const {quiz_id} = req.params;
    try {
        const quiz = await Quiz.findOne({_id: quiz_id});
        quiz.impressions++
        quiz.save();
        res.status(200).json({msg: "Increased impression count"});
    } catch(err) {
        next(err);
    }
}

const createQuiz = async(req,res,next) => {
    const {name,quizType,optionsType,timer,questions} = req.body;
    const {_id:user_id} = req["headers"].user;
    try {
        const quiz = await Quiz.create({userId: user_id,name,quizType,optionsType,timer,questions});
        quiz.route = `quizzes/play/${quiz._id}`;
        quiz.save();
        res.status(201).json({msg: "Successfully created quiz",quizRoute: quiz.route});
    } catch(err) {
        next(err);
    }
}


const deleteQuiz = async(req,res,next) => {
    const {quiz_id: _id} = req.params;
    try {
        await Quiz.findByIdAndDelete(_id);
        res.status(200).json({msg: "Successfully deleted quiz"});
    } catch(err) {
        next(err);
    }
}

const editQuiz = async(req,res,next) => {
    const {name,quizType,optionsType,timer,questions,_id} = req.body;
    try {
        await Quiz.findByIdAndUpdate(_id,{name,quizType,optionsType,timer,questions});
        res.status(200).json({msg: "Successfully updated quiz"});
    } catch(err) {
        next(err);
    }
}


const totalQuestions = async (req,res,next) => {
    try {
        const quizzes = await Quiz.find({});
        let questionLength = 0;
        for(const quiz of quizzes) {
            questionLength += quiz.questions.length;
        }
        res.status(200).json({total: questionLength});
    } catch(err) {
        next(err);
    }
}

const quizQuestions = async(req,res,next) => {
    const {quiz_id} = req.params;
    try {
        const quiz = await Quiz.findOne({_id: quiz_id});
        const {questions} = quiz;
        if(questions) {
            res.status(200).json(questions);
        } else {
            const error = new Error("No questions found");
            error.status = 404;
            next(error);
        }
    } catch(err) {
        next(err);
    }
}

const answerQuestion = async(req,res,next) => {
    const {user_answer} = req.body;
    const {quiz_id,question_id} = req.params;
    try {
        const quiz = await Quiz.findOne({_id: quiz_id});
        if(quiz) {
            const {quizType,questions} = quiz;
            const question = questions.find(question => question._id = question_id);
            quizType === "Poll" ? poll(question, user_answer) : qna(question,user_answer);
            quiz.save();
            res.status(201).json({msg: "Answered Question"});
        } else {
            const error = new Error("Quiz not found");
            error.status = 404;
            next(error);
        }
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getAllQuizzes,
    getQuizDetails,
    totalImpressions,
    increaseQuizImpressions,
    createQuiz,
    deleteQuiz,
    editQuiz,
    totalQuestions,
    quizQuestions,
    answerQuestion,
}