import Info from "./info/Info"
import QuizCards from "./card/QuizCards"
import styles from './QuizArea.module.css'

const QuizArea = () => {
    return (
        <div className= {styles["quizArea"]}>
            <Info />
            <QuizCards />
        </div>
    )
}

export default QuizArea
