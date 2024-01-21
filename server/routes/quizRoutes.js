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
const requireAuth = require('./../middleware/requireAuth');

router.get('/',requireAuth,getAllQuizzes);
router.get('/impressions',requireAuth,totalImpressions);
router.get('/:quiz_id',requireAuth,getQuizDetails);
router.patch('/:quiz_id/impressions',requireAuth,increaseQuizImpressions);
router.post('/create',requireAuth,createQuiz);
router.patch('/:quiz_id',requireAuth,editQuiz);
router.delete('/:quiz_id',requireAuth,deleteQuiz);
router.get('/questions',requireAuth,totalQuestions);
router.get('/:quiz_id/questions',requireAuth, quizQuestions);
router.delete('/:quiz_id/question',requireAuth, deleteQuestion);
router.patch('/:quiz_id/questions/:question_id/answer',requireAuth,answerQuestion);



module.exports = router;