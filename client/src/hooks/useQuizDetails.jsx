import { useEffect, useState } from "react";
import { getQuizDetails } from "../apis/quiz";

export const useQuizDetails = (quiz_id) => {
    const [quizDetails,setQuizDetails] = useState();
  
    useEffect(() => {
        const fetchDetails = async () => {
            const quiz = await getQuizDetails(quiz_id);
            setQuizDetails(quiz);
        }
        fetchDetails();
    },[]);
  
    return quizDetails;
  }