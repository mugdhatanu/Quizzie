import timestamp from "../../utils/timestamp"
import styles from './Analytics.module.css'
import EditIcon from './../../assets/edit.png'
import DeleteIcon from './../../assets/delete.png'
import ShareIcon from './../../assets/share.png'
import { Link } from "react-router-dom"
import { useState } from "react"
import { deleteQuiz } from "../../apis/quiz"
import { useQuizContext } from "../../context/QuizContext"
import Modal from "../../components/modal/Modal"
import { useModalContext } from "../../context/ModalContext"



const Quiz = ({quiz,index}) => {
    const [deleteBox,setDeleteBox] = useState(false);
    const {quizzes,setQuizzes} = useQuizContext();
    const {showModal,setShowModal} = useModalContext();
    const removeQuiz = () => {
        deleteQuiz(quiz._id);
        const updatedQuizzes = quizzes.filter(quizObj => quizObj._id !== quiz._id);
        setQuizzes(updatedQuizzes);
    }
    return (
        <>
            <tr>
                {deleteBox && 
                <td>
                    <div className = {styles["overlay"]}></div>
                </td>}
                {(showModal.initQuestions || showModal.initQuiz) && 
                <td>
                    <Modal quiz = {quiz}/>  
                </td>
                }
                {deleteBox && 
                <td>
                    <div className= {styles["delete"]}>
                        <h3>Are you confirm you want to delete ?</h3>
                        <div className= {styles["delete-btns"]}>
                            <button onClick={removeQuiz}>Confirm Delete</button>
                            <button onClick={() => setDeleteBox(false)}>Cancel</button>
                        </div>
                    </div>
                </td>}
            </tr>
            <tr className={styles["quiz"]}>
                <td>{index+1}</td>
                <td>{quiz.name}</td>
                <td>{timestamp(quiz.createdAt)}</td>
                <td>{quiz.impressions}</td>
                <td className={styles["buttons"]}>
                    <button onClick={() => setShowModal({initQuiz: false,initQuestions: true, edit: true})}>
                        <img src = {EditIcon} alt = "Edit Icon" />
                    </button>
                    <button onClick={() => setDeleteBox(true)}>
                        <img src = {DeleteIcon} alt = "Delete Icon" />
                    </button>
                    <button>
                        <img src = {ShareIcon} alt = "Share Icon" />
                    </button>
                </td>
                <td>
                    <Link to = {`/analytics/${quiz._id}`}>Question wise analysis</Link>
                </td>
            </tr>
        </>
        
    )
};

export default Quiz
