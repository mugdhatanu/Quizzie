import styles from './Info.module.css';

const Info = () => {
  return (
    <div className= {styles["info"]}>
      <div className= {`${styles["cards"]} ${styles["quiz"]}`}>
        <p><span className= {styles["value"]}>12</span> Quiz</p>
        <p>Created</p>
      </div>
      <div className= {`${styles["cards"]} ${styles["question"]}`}>
        <p><span className= {styles["value"]}>110</span> Questions</p>
        <p>Created</p>
      </div>
      <div className= {`${styles["cards"]} ${styles["impression"]}`}>
        <p><span className= {styles["value"]}>989</span> Total</p>
        <p>Impressions</p>
      </div>
    </div>
  )
}

export default Info
