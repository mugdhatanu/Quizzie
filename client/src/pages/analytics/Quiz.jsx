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
import { formatImpressionCount } from './../../utils/impression';
import { Toaster } from "react-hot-toast"
import { shareLink } from "../../utils/quizToast"



const Quiz = ({quiz,id,index,currentQuiz,setCurrentQuiz}) => {
    const [deleteBox,setDeleteBox] = useState(false);
    const {quizzes,setQuizzes} = useQuizContext();
    const {showModal,setShowModal} = useModalContext();
    const removeQuiz = () => {
        deleteQuiz(id);
        const updatedQuizzes = quizzes.filter(quizObj => quizObj._id !== id);
        setQuizzes(updatedQuizzes);
    }

    const getId = (e) => {
        const btn = e.target.parentElement;
        const firstAncestor = btn.parentElement;
        const secondAncestor = firstAncestor.parentElement;
        return firstAncestor.id || secondAncestor.id;
    }


    const edit = (e) => {
        const _id = getId(e);
        const quiz = quizzes.find(quiz=> quiz._id === _id);
        setCurrentQuiz(quiz);
        setShowModal({initQuiz: false,initQuestions: true, edit: true})
    
    }
    
    return (
        <>
            <Toaster />
            <tr>
                {deleteBox && 
                <td>
                    <div className = {styles["overlay"]}></div>
                </td>}
                {/* {!showModal.edit && (showModal.initQuestions || showModal.initQuiz) && 
                <td>
                    <Modal />  
                </td>
                } */}
                {showModal.edit && currentQuiz && (showModal.initQuestions || showModal.initQuiz) && 
                <td>
                    <Modal quiz = {currentQuiz}/>  
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
            <tr className={`${styles["quiz"]} ${index % 2 !== 0 ? styles["background"]: ""}`} id = {id}>
                <td>{index+1}</td>
                <td>{quiz.name}</td>
                <td>{timestamp(quiz.createdAt)}</td>
                <td>{formatImpressionCount(quiz.impressions)}</td>
                <td className={styles["buttons"] }>
                    <button onClick={(e) => edit(e)}>
                        <img src = {EditIcon} alt = "Edit Icon" />
                    </button>
                    <button onClick={() => setDeleteBox(true)}>
                        <img src = {DeleteIcon} alt = "Delete Icon" />
                    </button>
                    <button onClick={() => shareLink(quiz._id)}>
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
