import styles from './PlayQuiz.module.css';
import AnswerQuestions from '../../components/quiz/AnswerQuestions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizDetails, updateImpressions } from '../../apis/quiz';
import { useQuizDetails } from '../../hooks/useQuizDetails';


const PlayQuiz = () => {
  const [quiz,setQuiz] = useState(null);
  const {quiz_id} = useParams();
  const quizDetails = useQuizDetails(quiz_id);
  const [questionAnalysis,setQuestionAnalysis] = useState([]);
  const [pollAnalysis,setPollAnalysis] = useState([]);
  
  useEffect(() => {
    const fetchDetails = async () => {
        const getQuiz = await getQuizDetails(quiz_id);
        setQuiz(getQuiz);
    }
    const increaseImpressions = async () => {
      await updateImpressions(quiz_id);
    }
    increaseImpressions();
    fetchDetails();
  },[]);

  useEffect(() => {
    const getPollData = () => {
      return quizDetails?.questions.map(question => ({questionId: question._id,options: question.options}));
    }
    const data = quizDetails?.questions.map(question => ({questionId: question._id,totalAttempts: question.totalAttempts, correctAttempts: question.correctAttempts,incorrectAttempts: question.incorrectAttempts}));
    setQuestionAnalysis(data);
    const pollData = getPollData();
    setPollAnalysis(pollData);
  },[quizDetails]);


  return (
    <div className= {styles["play"]}>
      <AnswerQuestions 
      quiz = {quiz} 
      questions = {quiz?.questions} 
      questionAnalysis = {questionAnalysis}
      setQuestionAnalysis = {setQuestionAnalysis}
      pollAnalysis = {pollAnalysis}
      setPollAnalysis = {setPollAnalysis}
      />
    </div>
  )
}

export default PlayQuiz
