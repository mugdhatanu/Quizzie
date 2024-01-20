const Quiz = require('./../models/quiz');
const {poll,qna} = require('./../utils/analytics');



const getAllQuizzes = async(req,res,next) => {
    try {
        const quizzes = await Quiz.find({});
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
    const {name,quiz_type,options_type,timer,questions} = req.body;
    try {
        await Quiz.create({name,quizType: quiz_type,optionsType: options_type,timer,questions});
        res.status(201).json({msg: "Successfully created quiz"});
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
    const {name,quiz_type,options_type,timer,questions} = req.body;
    const {quiz_id: _id} = req.params;
    try {
        await Quiz.findByIdAndUpdate(_id,{name,quizType: quiz_type,optionsType: options_type,timer,questions});
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

const createQuestion = async(req,res,next) => {
    const {_id,options,answer,totalAttempts,correctAttempts,incorrectAttempts} = req.body;
    try {
        const quiz = await Quiz.findOne({_id});
        const {questions} = quiz;
        if(questions.length < 5) {
            const serialNum = question.length+1;
            const question = { options,answer,totalAttempts,correctAttempts,incorrectAttempts,serialNum};
            const updatedQuestions = questions.length ? [...questions,question]: [question];
            quiz.questions = updatedQuestions;
            quiz.save();
            res.status(200).json({msg: "Added question  Successfully"});
        } else {
            const error = new Error("Question limit reached");
            error.status = 400;
            next(error);
        }
        
    } catch(err) {
        next(err);
    }
}

const editQuestion = async(req,res,next) => {
    const {_id,serial_num,options,answer} = req.body;
    try {
        const quiz = await Quiz.findOne({_id});
        const {questions} = quiz;
        const question = questions.find(question => question.serialNum === serial_num);
        question.options = options;
        question.answer = answer;
        quiz.save();
        res.status(200).json({msg: "Question updating Successfully"});
    } catch(err) {
        next(err);
    }
}

const deleteQuestion = async(req,res,next) => {
    const {question_id} = req.body;
    const {quiz_id} = req.params;
    try {
        const quiz = await Quiz.findOne({_id: quiz_id});
        if(quiz) {
            const {questions} = quiz;
            if(questions.length > 1) {
                const updatedQuestions = questions.filter(question => question._id !== question_id);
                quiz.questions = updatedQuestions;
                quiz.save();
                res.status(200).json({msg: "Question deleted Successfully"});
            } else {
                const error = new Error("Mimimum one question is required");
                error.status = 400;
                next(error);
            }
        } else {
            const error = new Error("Quiz not found");
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
    createQuestion,
    editQuestion,
    deleteQuestion,
    answerQuestion,
}