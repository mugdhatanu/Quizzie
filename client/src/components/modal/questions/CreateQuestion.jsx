import { useEffect, useState } from "react";
import styles from './CreateQuestion.module.css'
import DeleteIcon from './../../../assets/delete.png'
import Timer from "./question/Timer";
import OptionTypes from "./question/OptionTypes";
import { useQuizContext } from "../../../context/QuizContext";
import { useModalContext } from "../../../context/ModalContext";

const CreateQuestion = ({
    index,
    question,
    questions,
    setQuestions,
    checkQuestionNum,
    timer,
    setTimer,
    optionsType,
    setOptionsType}) => {
    const {quizDetails} = useQuizContext();
    const {showModal} = useModalContext();
    const [options,setOptions] = useState([{serialNum: 1,select: false, value: {text: '', url:''}},{serialNum:2, select: false, value: {text: '', url:''}}]);
    const isPoll = quizDetails.quizType === "Poll";
    useEffect(() => {
        const {options:allOptions} = question;
        setOptions(prev => (showModal.edit ? allOptions: [...prev]));
    },[question]);



    const updateQuestionName = (e) => {
        let questionObj = {...question,questionName: e.target.value};
        const updateQuestions = questions.map(q => q.serialNum === question.serialNum ? questionObj: q);
        setQuestions(updateQuestions);
    }
    
    const selectAnswer = (index) => {
        const getAllOptions = options;
        getAllOptions.forEach((_,i) => {
            if(index === i) {
                getAllOptions[index].select = true;
            } else {
                getAllOptions[i].select = false;
            }
        })
        setOptions(getAllOptions);
        const correctOption = getAllOptions.find(option => option.select === true);
        const {value: {text, url}} = correctOption; 
        const updateQuestions = questions.map(q => q.serialNum === question.serialNum ? {...question,answer: {text, url}}: q);
        setQuestions(updateQuestions);
    }

    const optionValue = (e,i,isText) => {
        const getAllOptions = options;
        getAllOptions.forEach((_,currentIndex) => {
            if(i === currentIndex) {
                getAllOptions[i].value = {...getAllOptions[i].value, [isText ? "text" : "url"]: e.target.value};
            } 
        })
        setOptions(getAllOptions);
        const optionValues = getAllOptions.map(option => ({value: option.value}));
        let questionObj  = {...question,options: optionValues};
        if(showModal.edit) {
            const updatedOptions = options.map(option=> ({...option,timesSelected: 0}));
            questionObj = {...question,totalAttempts: 0,correctAttempts: 0,incorrectAttempts: 0,options: updatedOptions};
        }  
        const updateQuestions = questions.map(q => q.serialNum === question.serialNum ? questionObj: q);
        setQuestions(updateQuestions);  
    }

    const addOption = () =>{
        if(!showModal.edit) {
            const num = options[options.length-1].serialNum;
            if(options.length < 4) {
                setOptions(prev => [...prev,{serialNum: num+1,select: false, value: ''}])
            }
        }
        
    }
    const deleteOption = (index) => {
        if(!showModal.edit) {
            const updatedOptions = options.filter(option => option.serialNum !== index +1);
            setOptions(updatedOptions);
        } 
    }

    const checkIfAnswer = (option,answer, isTextImg) => {
        if(!isTextImg) {
            return option.value.text === answer.text
        } else {
            return (option.value.text === answer.text && option.value.url === answer.url);
        }
        
    }


    const displayOptions = options.map((option,i) => (
        <div key = {i} className= {`${styles["option"]} ${isPoll ? styles["poll-option"]: ""}`}>
            {!isPoll && (showModal.edit ? quizDetails?.optionsType !== "Text-Image" : optionsType !== "Text-Image") && <button  onClick = {() => selectAnswer(i)} className= {styles["select-btn"]}>
                <div className= {`${option.select ? styles["select"]: ""} ${(showModal.edit && checkIfAnswer(option,question.answer,false)) ? styles["select"]: ""}`}></div>
            </button>}
            {!isPoll && (showModal.edit ? quizDetails?.optionsType === "Text-Image": optionsType === "Text-Image") && <button onClick = {() => selectAnswer(i)} className= {styles["select-btn"]}>
                <div className= {`${option.select ? styles["select"]: ""} ${(showModal.edit && checkIfAnswer(option,question.answer,true)) ? styles["select"]: ""}`}></div>
            </button>}
            {(showModal.edit ? quizDetails?.optionsType !== "Text-Image" : optionsType !== "Text-Image") && <input type = "text" value = {option.value.text} className= {`${option.select ? styles["select"]: ""} ${(showModal.edit && checkIfAnswer(option,question.answer,false)) ? styles["select"]: ""}`} onChange = {(e) => optionValue(e,i,true)} />}
            {(showModal.edit ? quizDetails?.optionsType === "Text-Image": optionsType === "Text-Image") && 
            <div className= {styles["text-img"]}>
                <input type = "text" value = {option.value.text} className= {`${option.select ? styles["select"]: ""} ${(showModal.edit && checkIfAnswer(option,question.answer,false)) ? styles["select"]: ""}`} onChange = {(e) => optionValue(e,i,true)}/>
                <input type = "text" value = {option.value.url} className= {`${option.select ? styles["select"]: ""} ${checkIfAnswer(option,question.answer,false) ? styles["select"]: ""}`} onChange = {(e) => optionValue(e,i,false)}/>
            </div>}
            {i >= 2 && <button className= {styles["delete-option"] } onClick={() => deleteOption(i)}>
            <img src = {DeleteIcon} alt = "Delete Icon" />
            </button>}
        </div>
    ));

    return (
        <div className= {`${styles["question"]} ${checkQuestionNum(index) ? "": styles["visibility"]}`}>
            <input type = "text" placeholder = "Question Name" value = {question.questionName} onChange = {(e) => updateQuestionName(e)} className= {styles["question-name"]}/>
            <OptionTypes optionsType = {optionsType} setOptionsType = {setOptionsType}/>
            <div className= {styles["options-timer"]}>
                <fieldset className= {styles["options"]}>
                {displayOptions}
                {options.length < 4 && <button disabled = {showModal.edit} onClick = {addOption} className= {`${styles["add-option"]} ${isPoll ? styles['poll-btn']: ""}`}>Add Option</button>}
                </fieldset>
                {!isPoll &&  <Timer timer = {timer} setTimer = {setTimer}/>}
            </div>
        </div>
    )}

export default CreateQuestion
