import { useEffect, useState } from 'react';
import PollCards from '../../components/analysis/PollCards';
import QuestionCards from '../../components/analysis/QuestionCards';
import Modal from '../../components/modal/Modal';
import { useModalContext } from '../../context/ModalContext';
import styles from './QuestionAnalysis.module.css'
import { useParams } from 'react-router-dom';
import { getQuizDetails } from '../../apis/quiz';
import timestamp from './../../utils/timestamp';
import { useQuizDetails } from '../../hooks/useQuizDetails';


const QuestionAnalysis = () => {
    const {showModal} = useModalContext();
    const show = showModal.initQuestions || showModal.initQuiz;
    const {quiz_id} = useParams();
    const quizDetails = useQuizDetails(quiz_id);
    const displayCards = quizDetails?.questions?.map((question,index) => (
        <div key = {question._id}>
            <p className= {styles["question-title"]}>Q.{index+1} {question.questionName} ?</p>
            {quizDetails?.quizType === "Question" && <QuestionCards question = {question}/>}
            {quizDetails?.quizType === "Poll" && <PollCards question= {question}/>}
            <hr />
        </div>
       
    ))

    return (
        <div className= {styles['analysis']}>
            <div className= {styles['header']}>
                <h2>Quiz 2 Question Analysis</h2>
                <div className= {styles["details"]}>
                    <p>Created on : {timestamp(quizDetails?.createdAt)}</p>
                    <p>Impressions : {quizDetails?.impressions}</p>
                </div>
            </div>
            <div className= {styles["analysis-data"]}>
                <div className= {styles["question-area"]}>
                    {displayCards}
                </div>
            </div>
            {show && <div className= {styles['overlay']}></div>}
            <Modal />
        </div>
    )
}

export default QuestionAnalysis
