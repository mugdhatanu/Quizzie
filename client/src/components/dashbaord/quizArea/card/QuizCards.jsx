import QuizCard from "./QuizCard";
import styles from './QuizCards.module.css';
import { useQuizzes } from "../../../../hooks/useQuizzes";

const QuizCards = () => {
    const [quizzes,loading,error] = useQuizzes();
    const displayQuizCards = quizzes?.map((quiz,index) => (
        <QuizCard key = {index} quiz = {quiz} />
    ))
    return (
        <div className= {styles["quiz-cards"]}>
            <h3>Trending Quizs</h3>
            {loading && <p className= {styles["none"]}>Please wait while your quizzes get loaded...</p>}
            {!loading && 
            <>
                {!error ?  
                <div className= {styles["cards-section"]}>
                {quizzes && quizzes.length ? displayQuizCards : <p className= {styles["none"]}>There are no quiz to display</p>}
                </div>: 
                <p className= {styles["none"]}>Error loading the quizzes</p>}
            </>
            }
        </div>
    )
}

export default QuizCards
