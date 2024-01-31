const Quiz = require('./../models/quiz');



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


const quizCardDetails = async(req,res,next) => {
    const {_id: user_id} = req["headers"].user;
    try {
        const quizzes = await Quiz.find({userId: user_id});
        let totalQuestions = 0;
        let totalImpressions = 0;
        for(const quiz of quizzes) {
            let {questions,impressions} = quiz;
            totalQuestions += questions.length;
            totalImpressions += impressions;
        }
        res.status(200).json({totalQuizzes: quizzes.length, totalQuestions, totalImpressions});
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
        quiz.save();
        res.status(201).json({msg: "Successfully created quiz",quiz});
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
    const {quiz_id,updatedData} = req.body;
    try {
        let quiz = await Quiz.findOne({_id: quiz_id});
        const {questions, optionsType} = quiz;
        let updatedQuestions = questions.map(question => {
            let updatedQuestion = updatedData.find(uq => uq._id === String(question._id));
            let hasOptionChanged = false;
            if(optionsType === 'Text-Image') {
                hasOptionChanged = question.options.some((option, index) => {
                    return updatedQuestion.options[index].value.text !== option.value.text || 
                           updatedQuestion.options[index].value.url !== option.value.url;
                });
            } else {
                hasOptionChanged = question.options.some((option, index) => {
                    return updatedQuestion.options[index].value.text !== option.value.text;
                });
            }
            if(updatedQuestion.questionName !== question.questionName || hasOptionChanged) {
                updatedQuestion.options.forEach(option => {
                    option.timesSelected = 0;
                });
                    question.answer = updatedQuestion.answer;
                    updatedQuestion.totalAttempts = 0;
                    updatedQuestion.correctAttempts = 0;
                    updatedQuestion.incorrectAttempts = 0;
                return updatedQuestion;
            }
            else {
                return question;
            }
        });
        quiz.questions = updatedQuestions;
        await quiz.save();
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

const answerQuestions = async(req,res,next) => {
    const {questionAnalysis} = req.body;
    const {quiz_id} = req.params;
    try {
        const quiz = await Quiz.findOne({_id: quiz_id});
        if(quiz) {
            const {quizType,questions} = quiz;
            for(const analysisObj of questionAnalysis) {
                const question = questions.find(question => String(question._id) === analysisObj.questionId);
                if(quizType !== "Poll") {
                    question.$set({
                        totalAttempts: analysisObj.totalAttempts,
                        correctAttempts: analysisObj.correctAttempts,
                        incorrectAttempts: analysisObj.incorrectAttempts
                      });   
                } else {
                    question.$set({
                        options: analysisObj.options
                    });
                }
            }
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
    quizCardDetails,
    increaseQuizImpressions,
    createQuiz,
    deleteQuiz,
    editQuiz,
    totalQuestions,
    quizQuestions,
    answerQuestions,
}