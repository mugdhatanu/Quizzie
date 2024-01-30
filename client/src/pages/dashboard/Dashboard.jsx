import QuizArea from "../../components/dashbaord/quizArea/QuizArea"
import styles from './Dashboard.module.css';
import Modal from "../../components/modal/Modal";
import { useModalContext } from "../../context/ModalContext";



const Dashboard = () => {
  const {showModal} = useModalContext();
  const show = showModal.initQuestions || showModal.initQuiz;


  return (
    <div className= {styles["dashboard"]}>
        {show && <div className= {styles["overlay"]}></div>}
        <QuizArea />
        <Modal/>
    </div>
  )
}

export default Dashboard
