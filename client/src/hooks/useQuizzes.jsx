import { useEffect, useState } from "react";
import { getQuizzes } from "../apis/quiz";
import { useQuizContext } from "../context/QuizContext";

export const useQuizzes = () => {
    const {quizzes,setQuizzes} = useQuizContext();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      const fetchQuizzes = async () => {
        try {
          const allQuizzes = await getQuizzes();
          setQuizzes(allQuizzes);
          setError(false);
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      };
      fetchQuizzes();
    }, []);
  
    return [quizzes,loading,error];
  }