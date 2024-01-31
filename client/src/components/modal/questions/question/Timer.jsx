import { useModalContext } from '../../../../context/ModalContext';
import { useQuizContext } from '../../../../context/QuizContext'
import styles from './../CreateQuestion.module.css'


const Timer = ({timer,setTimer}) => {
    const {quizDetails} = useQuizContext();
    const {showModal} = useModalContext(); 
    const selectValue = (value) => {
        localStorage.setItem("timer",value);
        setTimer(value);
    }
    return (
        <div className= {styles["timer"]}>
            <p>Timer </p>
            <div>
                <button disabled = {showModal.edit} onClick = {() => {selectValue("OFF")}} className= {`${quizDetails.timer === "OFF" || timer === "OFF" ? styles["select"]: ""}`}>OFF</button> 
                <button disabled = {showModal.edit} onClick = {() => {selectValue("5")}} className= {`${quizDetails.timer == "5" || timer === "5" ? styles["select"]: ""}`}>5</button>
                <button disabled = {showModal.edit} onClick = {() => {selectValue("10")}} className= {`${quizDetails.timer == "10" || timer === "10" ? styles["select"]: ""}`}>10</button>
            </div>
        </div>
    )
}

export default Timer
