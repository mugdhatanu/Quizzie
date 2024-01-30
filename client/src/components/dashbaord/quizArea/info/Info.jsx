import styles from './Info.module.css';
import { formatImpressionCount } from './../../../../utils/impression';
import { useEffect, useState } from 'react';
import { getDetails } from '../../../../apis/quiz';

const Info = () => {
  const [cardDetails,setCardDetails] = useState({totalQuizzes: 0,totalQuestions:0, totalImpressions: 0 });
  useEffect(() => {
    const fetchCardDetails = async() => {
      try {
        const details = await getDetails();
        setCardDetails(details);
      } catch(err) {
        setCardDetails({totalQuizzes: 0,totalQuestions:0, totalImpressions: 0 })
      }
    }
    fetchCardDetails();
  },[]);

  
  return (
    <div className= {styles["info"]}>
      <div className= {`${styles["cards"]} ${styles["quiz"]}`}>
        <p><span className= {styles["value"]}>{cardDetails?.totalQuizzes}</span> Quiz</p>
        <p>Created</p>
      </div>
      <div className= {`${styles["cards"]} ${styles["question"]}`}>
        <p><span className= {styles["value"]}>{cardDetails?.totalQuestions}</span> Questions</p>
        <p>Created</p>
      </div>
      <div className= {`${styles["cards"]} ${styles["impression"]}`}>
        <p><span className= {styles["value"]}>{formatImpressionCount(cardDetails?.totalImpressions)}</span> Total</p>
        <p>Impressions</p>
      </div>
    </div>
  )
}

export default Info
