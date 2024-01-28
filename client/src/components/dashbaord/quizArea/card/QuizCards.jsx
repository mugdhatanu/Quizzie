import QuizCard from "./QuizCard";
import { useQuizContext } from "../../../../context/QuizContext";
import styles from './QuizCards.module.css';

const QuizCards = () => {
    const {quizzes} = useQuizContext();
    const displayQuizCards = quizzes?.map((quiz,index) => (
        <QuizCard key = {index} quiz = {quiz} />
    ))
    return (
        <div className= {styles["quiz-cards"]}>
            <h3>Trending Quizs</h3>
            <div className= {styles["cards-section"]}>
                {quizzes && quizzes.length ? displayQuizCards : <p className= {styles["none"]}>There are no quiz to display</p>}
            </div>
        </div>
    )
}

export default QuizCards
