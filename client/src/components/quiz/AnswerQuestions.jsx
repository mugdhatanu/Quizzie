import { Fragment, useState } from 'react';
import styles from './AnswerPage.module.css';
import Result from './Result';
import { selectAnswers } from '../../apis/quiz';

const AnswerQuestions = ({quiz,questions,questionAnalysis,setQuestionAnalysis,pollAnalysis,setPollAnalysis}) => {
  const [currentQuestion,setCurrentQuestion] = useState(1);
  const [showResult,setShowResult] = useState(false);
  const [score,setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState({text: '', url: ''});
  const [selectedPollOption,setSelectedPollOption] = useState();
  const [prevScore,setPrevScore] = useState(0);
  

  const submit = (question) => {
    const {quizType,_id: quizId} = quiz;
    nextQuestion(question);
    const finalData = quizType === "Poll" ? pollAnalysis : questionAnalysis;
    setShowResult(true);
    selectAnswers(quizId,finalData);
  }

  const checkAnswer = (question,option) => {
    const {optionsType} = quiz;
    const {answer} = question;
    if(optionsType !== "Text-Image") {
      setSelectedOption({text: option.value.text,url: option.value.url});
      if(option.value.text === answer.text) {
        setScore(prev => prev+1);
      } else {
        if(score > prevScore) {
          setScore(prev => prev - 1);
        }
      }
    } else {
      setSelectedOption({text: option.value.text,url: option.value.url});
      if(option.value.text === answer.text && option.value.url === answer.url) {
        setScore(prev=> prev+1);
      } else {
        if(score > prevScore) {
          setScore(prev => prev - 1);
        }
      }
    } 
  }


  const increaseCount = (question,option) => {
    const questionObj = pollAnalysis.find(poll => poll.questionId === question._id);
    const options = questionObj?.options;
    const updateOption = options.find(optionObj => optionObj._id === option._id);
    const prevTimesSelected = options.reduce(optionObj => optionObj._id === option._id ? optionObj.timesSelected : 0);
    if(updateOption.timesSelected - prevTimesSelected < 1) {
      updateOption.timesSelected++;
    }   
    setSelectedPollOption(updateOption)
  }


  const getOptionStyle = (option,selectedOption,isTextImg) => {
    const {quizType} = quiz;
    if(quizType !== "Poll") {
      if(isTextImg) {
        return option.value.text === selectedOption.text? { border: "2px solid blue" }: {};
      } else {
        return (option.value.text === selectedOption.text && option.value.url === selectedOption.url)? { border: "2px solid blue" }: {};
      }
    } else {
      return option._id === selectedOption._id ? { border: "2px solid blue" }: {};
    }
  }


  const nextQuestion = (question) => {
    const {quizType} = quiz;
    const {options, _id: questionId} = question; 
    if(quizType !== "Poll") {
      setCurrentQuestion(prev => prev+1);
      const updateQuestion = questionAnalysis.find(question => question.questionId === questionId);
      updateQuestion.totalAttempts++;
      if(prevScore === score) {
        updateQuestion.incorrectAttempts++;
      } else {
        updateQuestion.correctAttempts++;
      }
      const updatedData = questionAnalysis.filter(question => question.questionId === questionId ? updateQuestion :question);
      setQuestionAnalysis(updatedData);
      setPrevScore(score);
    } else {
      const updatedOptions = options.map(option => option._id === selectedPollOption._id ? selectedPollOption : option);
      setPollAnalysis(updatedOptions);
    }
  }


  const displayOptions = (question,options) => {
    if(quiz?.optionsType !== "Text-Image") {
      return options.map((option,index) => (
        <button key = {index} onClick = {() => quiz?.quizType === "Poll" ? increaseCount(question,option) : checkAnswer(question,option)} style = {getOptionStyle(option,selectedOption,false)}>{option.value.text}</button>
      ))
    } else {
      return options.map((option,index) => (
        <button key = {index} onClick = {() => quiz?.quizType === "Poll" ? increaseCount(question,option) : checkAnswer(question,option)} style = {getOptionStyle(option,selectedOption,true)}>{option.value.text}{option.value.url}</button>
      ))
    }
  }
  
  const displayQuestions = questions?.map((question,index) => (
    <Fragment key = {index}>
      {question.serialNum === currentQuestion && 
      <section className = {styles["quiz-section"]}>
        <header>
            <p className= {styles["question-num"]}>0{question.serialNum}/0{questions?.length}</p>
            {quiz?.timer !== "OFF" && <p className= {styles["timer"]}>00:10s</p>}
        </header>
        <main>
            <h3 className= {styles["question-text"]}>Your question text comes here, its a sample text.</h3>
            <div className= {styles["options"]}>
            {displayOptions(question,question.options)}
            </div>
            {currentQuestion !== questions?.length && <button className= {styles["next"]} onClick={() => nextQuestion(question)}>NEXT</button>}
            {currentQuestion === questions?.length &&  <button className= {styles["next"]} onClick={() => submit(question)}>SUBMIT</button>}
        </main>
      </section>}
    </Fragment>
    
  ))

  return (
    <>
      {showResult ? <Result score = {score} quiz = {quiz} questions = {questions}/> : displayQuestions}
    </>
    
  )
}

export default AnswerQuestions
