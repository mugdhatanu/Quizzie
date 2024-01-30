import { useQuizContext } from "../../context/QuizContext"
import Quiz from "./Quiz"
import styles from './Analytics.module.css'
import { useModalContext } from "../../context/ModalContext";
import { useQuizzes } from "../../hooks/useQuizzes";


const Analytics = () => {
  const [quizzes] = useQuizzes();
  const {showModal} = useModalContext();
  const displayQuizzes = quizzes?.map((quiz,index) => (
    <Quiz 
    key = {quiz._id}
    quiz = {quiz} 
    index = {index} 
    />
  ))
  const show = showModal.initQuestions || showModal.initQuiz;
  return (
    <div className= {styles["analytics"]}>
      {show && <div className= {styles["overlay"]}></div>}
      <h2>Quiz Analysis</h2>
      <table>
        <thead className= {styles["header"]}>
            <tr>
                <th>S No.</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {displayQuizzes}
        </tbody>
      </table>
    </div>
  )
}

export default Analytics
