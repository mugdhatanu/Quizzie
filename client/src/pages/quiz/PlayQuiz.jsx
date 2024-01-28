import styles from './PlayQuiz.module.css';
import Result from '../../components/quiz/Result';
import AnswerQuestions from '../../components/quiz/AnswerQuestions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizDetails } from '../../apis/quiz';


const PlayQuiz = () => {
  const [answersSubmitted,setAnswersSubmitted] = useState(false);
  const {quiz_id} = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
        const quiz = await getQuizDetails(quiz_id);
        console.log(quiz);
    }
    fetchDetails();
},[]);

  return (
    <div className= {styles["play"]}>
      {answersSubmitted ? 
      <Result /> : 
      <AnswerQuestions />}
    </div>
  )
}

export default PlayQuiz
