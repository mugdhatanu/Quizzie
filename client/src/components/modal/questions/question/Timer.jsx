import { useQuizContext } from '../../../../context/QuizContext'
import styles from './../CreateQuestion.module.css'


const Timer = () => {
    const {quizDetails,setQuizDetails} = useQuizContext();
    return (
        <div className= {styles["timer"]}>
            <p>Timer </p>
            <div>
                <button onClick = {() => setQuizDetails(prev => ({...prev,timer: "OFF"}))} className= {`${quizDetails.timer === "OFF" ? styles["select"]: ""}`}>OFF</button> 
                <button onClick = {() => setQuizDetails(prev => ({...prev,timer: "5"}))} className= {`${quizDetails.timer == "5" ? styles["select"]: ""}`}>5</button>
                <button onClick = {() => setQuizDetails(prev => ({...prev,timer: "10"}))} className= {`${quizDetails.timer == "10" ? styles["select"]: ""}`}>10</button>
            </div>
        </div>
    )
}

export default Timer
