import timestamp from '../../../../utils/timestamp';
import styles from './QuizCards.module.css';
import EyeImg from './../../../../assets/eye.png'

const QuizCard = ({quiz}) => {
  return (
    <div className = {styles["quiz-card"]}>
        <div className = {styles["detail"]}>
          <p className = {styles["name"]}>{quiz.name}</p>
          <div className = {styles["impression"]}>
            <p>{quiz.impressions}</p>
            <img src = {EyeImg} alt = "Eye Icon" />
          </div>
        </div>
        <p className = {styles["time"]}>Created on: {timestamp(quiz.createdAt)}</p>
    </div>
  )
}

export default QuizCard
