import styles from './Cards.module.css'

const QuestionCards = ({question}) => {

  return (
    <div className= {styles["question-cards"]}>
        <div>
            <p className= {styles["value"]}>{question.totalAttempts}</p>
            <p>people Attempted the question</p>
        </div>
        <div>
            <p className= {styles["value"]}>{question.correctAttempts}</p>
            <p>people Answered Correctly</p>
        </div>
        <div>
            <p className= {styles["value"]}>{question.incorrectAttempts}</p>
            <p>people Answered Incorrectly</p>
        </div>
    </div>
  )
}

export default QuestionCards
