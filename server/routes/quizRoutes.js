const router = require('express').Router();
const {
    getAllQuizzes,
    getQuizDetails,
    createQuiz,
    editQuiz,
    deleteQuiz,
    increaseQuizImpressions,
    totalQuestions,
    quizQuestions,
    answerQuestions,
    quizCardDetails
    } = require('./../controllers/quizControllers');
const requireAuth = require('./../middleware/requireAuth');

router.get('/',requireAuth,getAllQuizzes);
router.get('/details',requireAuth,quizCardDetails);
router.get('/:quiz_id',requireAuth,getQuizDetails);
router.patch('/:quiz_id/impressions',requireAuth,increaseQuizImpressions);
router.post('/create',requireAuth,createQuiz);
router.patch('/edit',requireAuth,editQuiz);
router.delete('/:quiz_id',requireAuth,deleteQuiz);
router.get('/questions',requireAuth,totalQuestions);
router.get('/:quiz_id/questions',requireAuth, quizQuestions);
router.patch('/:quiz_id/',requireAuth,answerQuestions);



module.exports = router;