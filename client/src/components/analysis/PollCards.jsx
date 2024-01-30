import styles from './Cards.module.css'

const PollCards = ({question}) => {
   
    const displayOptions = question?.options.map((option,index) => (
        <div>
            <p className= {styles["value"]}>{option.timesSelected}</p>
            <p>Option {index+1}</p>
        </div>
    ))
  return (
    <div className= {`${styles["question-cards"]} ${styles["poll-cards"]}`}>
        {displayOptions}
    </div>
  )
}

export default PollCards
