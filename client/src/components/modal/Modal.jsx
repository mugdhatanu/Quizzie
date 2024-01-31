import { useEffect } from "react";
import InitializeQuiz from "./quiz/InitializeQuiz";
import Questions from "./questions/Questions";
import { useQuizContext } from "../../context/QuizContext";
import styles from './Modal.module.css';
import { useModalContext } from "../../context/ModalContext";

const Modal = ({quiz}) => {
    const {showModal} = useModalContext();
    const {setQuizDetails} = useQuizContext();
    useEffect(() => {
        setQuizDetails({
            name: showModal.edit ? quiz?.name: '',
            impressions: showModal.edit ? quiz?.impressions: 0,
            quizType: showModal.edit? quiz?.quizType: '',
            optionsType: showModal.edit? quiz?.optionsType: '',
            timer: showModal.edit? quiz?.timer: '',
            questions: showModal.edit? quiz?.questions: []
        })
    },[showModal.edit]);
  

    const show = showModal.initQuiz || showModal.initQuestions;
    return (
        <div className= {styles[`${show ? "modal" : ""}`]}>
            {showModal.initQuiz && !showModal.edit && <InitializeQuiz />}
            {showModal.initQuestions && <Questions id = {quiz?._id}/>}
        </div>
    )
}

export default Modal
