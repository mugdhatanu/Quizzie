import { useState } from "react";
import { useModalContext } from "../../../context/ModalContext";
import { useQuizContext } from "../../../context/QuizContext"
import styles from './Quiz.module.css'
import { checkQuizNamAndType } from "../../../utils/validation/quizForm";

const InitializeQuiz = () => {
  const {quizDetails,setQuizDetails} = useQuizContext();
  const {setShowModal} = useModalContext();
  const [select,setSelect] = useState({qna: false,poll: false}); 
  const [error,setError] = useState(false);
  
  const cancel = () => {
    setShowModal({initQuiz: false, initQuestions: false,edit: false})
  }
  const questionsModal = (e) => {
    e.preventDefault();
    if(checkQuizNamAndType(quizDetails)) {
      setShowModal(prev => ({initQuiz: !prev.initQuiz,initQuestions: true,edit: prev.edit}));
    } else {
      setError(true);
    }
  }

  const selectOption = (e,option) => {
    e.preventDefault();
    option === 'Poll' ? setSelect({qna: false, poll: true}): setSelect({qna: true, poll: false}); 
    setQuizDetails(prev => ({...prev,quizType: option}))
  }

  
  return (
    <form className= {styles["init-quiz"]}>
      {error && <p className = {styles['error-text']}>All fields are required</p>}
      <input 
      placeholder = "Quiz name" 
      type = "text" 
      value = {quizDetails.name} 
      onChange = {(e) => setQuizDetails(prev => ({...prev,name: e.target.value}))}
      />
      <div className= {styles["quiz-type"]}>
        <p>Quiz Type</p>
        <button onClick = {(e) => selectOption(e,'Question')} className= {`${select.qna ? styles["select"]: ""}`}>
          Q & A
        </button>
        <button onClick = {(e) => selectOption(e,'Poll')} className= {`${select.poll ? styles["select"]: ""}`}>
          Poll
        </button>
      </div>
      <div className= {styles["nav-buttons"]}>
        <button onClick={cancel} className= {styles["cancel"]} >Cancel</button>
        <button onClick={questionsModal}className= {styles["continue"]} >Continue</button>
      </div>
    </form>
  )
}

export default InitializeQuiz;
