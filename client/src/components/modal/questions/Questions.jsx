import { useEffect, useState } from "react"
import CreateQuestion from "./CreateQuestion";
import { addNewQuiz, updateQuiz } from "../../../apis/quiz";
import { useQuizContext } from "../../../context/QuizContext";
import { useModalContext } from "../../../context/ModalContext";
import styles from './Questions.module.css';
import CrossIcon from './../../../assets/cross.png';
import { checkDetails, checkIdentical } from "../../../utils/validation/quizForm";
import { shareLink } from "../../../utils/quizToast";



const Questions = ({id}) => {
    const {setQuizzes,quizDetails,setQuizDetails} = useQuizContext();
    const {showModal,setShowModal} = useModalContext();
    const [clickedQuestion,setClickedQuestion] = useState(1);
    const [timer,setTimer] = useState(localStorage.getItem("timer"));
    const {questions: quizQuestions} = quizDetails;
    const [questions,setQuestions] = useState([{serialNum: 1,options: [], answer: '',questionName: ''}]);
    const btns = new Array(quizQuestions?.length).fill().map((_, i) => i + 1);
    const [createQuizBtns,setCreateQuizBtns] = useState([1]);
    const [quizId,setQuizId] = useState('');
    const [error,setError] = useState(false);
    const [identical,setIdentical] = useState(false);
    const [optionsType,setOptionsType] = useState(localStorage.getItem("optionsType"))

    useEffect(() => {
        const ques = showModal.edit ? quizQuestions: questions;
        const updateBtns = showModal.edit ? btns: [1];
        setCreateQuizBtns(updateBtns);
        setQuestions(ques);
    },[quizDetails]);

    useEffect(() => {
        localStorage.removeItem("created");
    },[])


    const addQuestion = () => {
        if(questions.length <= 5) {
            setClickedQuestion(prev=> prev+1);
            const btnNumber = createQuizBtns[createQuizBtns.length-1] + 1;
            setCreateQuizBtns(prev => ([...prev,btnNumber]));
            setQuestions(prev => ([...prev,{serialNum: btnNumber,options:[],answer: '',questionName: ''}]))
        }
    }

    const deleteQuesion = (index) => {
        const updatedQuestions = questions.filter(question => question.serialNum !== index+1);
        const updatedButtons = createQuizBtns.filter(button => button !== index + 1);
        setQuestions(updatedQuestions);
        setCreateQuizBtns(updatedButtons);
        setClickedQuestion(prev=> prev-1);
    }

    const checkQuestionNum = (index) => {
        return clickedQuestion === index + 1; 
    }
    const displayQuestions = questions?.map((question,index) => (
        <CreateQuestion 
        key = {index}
        index = {index}
        question = {question}
        questions = {questions}
        setQuestions = {setQuestions} 
        checkQuestionNum={checkQuestionNum}
        timer = {timer}
        setTimer = {setTimer}
        optionsType = {optionsType}
        setOptionsType = {setOptionsType}
        />
    ))

    const displayBtns = createQuizBtns.map((btn,i) => (
        <div key = {i} className= {styles["btn"]}>
            <button onClick = {() => setClickedQuestion(i+1)}>{btn}</button>
            {i > 0 && <button disabled = {showModal.edit} onClick = {() => deleteQuesion(i)} className= {`${styles["delete"]} ${checkQuestionNum(i) ? "": styles["visibility"]}`}>x</button>}
        </div>
        
    ))

    const editQuiz = async () => {
        const quiz = {...quizDetails,questions};
        if(checkDetails(quiz)) {
            if(checkIdentical(quiz)) {
                updateQuiz(id,questions);
                setTimeout(() => {
                    location.reload();
                },1000);
            } else {
                setIdentical(true);
            }
            
        } else {
            setError(true);
        }
    }

    const createQuiz = async () => {
        const quiz = {...quizDetails,questions,timer: localStorage.getItem("timer"),optionsType: localStorage.getItem("optionsType")};
        const isPoll = quizDetails.quizType === "Poll";
        if(isPoll) {
            const updateQuestions = questions.map(question => ({...question,answer: {}}));
            quiz.questions = updateQuestions;
        }
        if(checkDetails(quiz)) {
            if(checkIdentical(quiz)) {
                setQuizDetails(prev => ({...prev,questions}));
                try {
                    const {quiz: newQuiz} = await addNewQuiz(quiz);
                    setQuizId(newQuiz._id);
                    const time = new Date();
                    const updatedQuiz = {...quiz,createdAt: time};
                    setQuizzes(prev => [...prev,updatedQuiz]);
                    localStorage.setItem("created",true);
                    localStorage.removeItem("timer");
                    localStorage.removeItem("optionsType");
                } catch(err) {
                    console.log(err);
                }
            } else {
                setError(false);
                setIdentical(true)
            }    
        } else {
            setIdentical(false);
            setError(true);
        }
    }
    return (
        <>
           {!localStorage.getItem("created") ? <div className= {styles["questions"]}>
                {error && <p className = {styles['error-text']}>All fields are required</p>}
                {!error && identical && <p className = {styles['error-text']}>Remove identical options</p>}
                <div className= {styles["display-btns"]}>
                    <div className= {styles["btns"]}>
                        {displayBtns}
                        {questions?.length < 5 && <button disabled = {showModal.edit} onClick = {addQuestion} className= {styles["add"]}>+</button>}
                    </div>
                    <p>Max 5 questions</p>
                </div>
                {displayQuestions}
                <div className= {styles["create-buttons"]}>
                    <button onClick={() => setShowModal({initQuiz: false,initQuestions: false})}>Cancel</button>
                    {!showModal.edit && <button onClick={createQuiz} className= {styles["create"]}>Create Quiz</button>}
                    {showModal.edit && <button onClick={editQuiz} className= {styles["create"]}>Edit Quiz</button>}
                </div>
            </div> : 
            <div className = {styles['quiz-created']}>
                <div className= {styles["close"]}>
                    <img src = {CrossIcon} alt = "Cross Icon" onClick={() => setShowModal({initQuiz: false,initQuestions: false})}/>
                </div>
                <h3>Congrats your Quiz is <br/>Published!</h3>
                <div className= {styles["link"]}>{`https://quiz027.netlify.app/quizzes/play/${quizId}` || "Your Link here"}</div>
                <button onClick={() => shareLink(quizId)}>Share</button>
            </div>} 
            
        </>
        
    )
}

export default Questions
