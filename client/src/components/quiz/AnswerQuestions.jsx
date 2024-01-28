import styles from './AnswerPage.module.css';

const AnswerQuestions = () => {
  return (
    <section className = {styles["quiz-section"]}>
      <header>
          <p className= {styles["question-num"]}>01/04</p>
          <p className= {styles["timer"]}>00:10s</p>
      </header>
      <main>
          <h3 className= {styles["question-text"]}>Your question text comes here, its a sample text.</h3>
          <div className= {styles["options"]}>
            <button>Option</button>
            <button>Option</button>
            <button>Option</button>
            <button>Option</button>
          </div>
          <button className= {styles["next"]}>NEXT</button>
      </main>
    </section>
  )
}

export default AnswerQuestions
