const router = require('express').Router();
const {
    getAllQuizzes,
    getQuizDetails,
    createQuiz,
    editQuiz,
    deleteQuiz,
    totalImpressions,
    increaseQuizImpressions,
    totalQuestions,
    quizQuestions,
    deleteQuestion,
    answerQuestion} = require('./../controllers/quizControllers');


router.get('/',getAllQuizzes);
router.get('/impressions',totalImpressions);
router.get('/:quiz_id',getQuizDetails);
router.patch('/:quiz_id/impressions',increaseQuizImpressions);
router.post('/create',createQuiz);
router.patch('/:quiz_id',editQuiz);
router.delete('/:quiz_id',deleteQuiz);
router.get('/questions',totalQuestions);
router.get('/:quiz_id/questions', quizQuestions);
router.delete('/:quiz_id/question', deleteQuestion);
router.patch('/:quiz_id/questions/:question_id/answer',answerQuestion);



module.exports = router;