import styles from './AnswerPage.module.css';
import TrophyIcon from './../../assets/trophy.png';


const Result = ({score,quiz,questions}) => {
  const {quizType} = quiz;
  return (
    <section className= {styles["result"]}>
       {quizType === "Poll" ? 
       <h1 className= {styles["poll-text"]}>Thank you <br />for participating <br/>in the Poll</h1>
       :
       <>
         <h1 className= {styles["completion-text"]}>Congrats Quiz is completed</h1>
         <img src = {TrophyIcon} alt= 'Trophy Icon' />
         <div className= {styles["score"]}>
          <p>Your score is</p>
          <p>0{score}/0{questions.length}</p>
         </div>
       </>
       }
    </section>
  )
}

export default Result
