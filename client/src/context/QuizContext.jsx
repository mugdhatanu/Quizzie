import { createContext, useState, useContext } from "react";


export const CreateQuizContext = createContext("");

export const QuizContextProvider = ({children}) => {
    const [quizzes,setQuizzes] = useState([]);
    const [quizDetails,setQuizDetails] = useState({
        name:'',
        impressions: 0,
        quizType: '',
        optionsType: '',
        timer: '',
        questions: []
    })
    return (
        <CreateQuizContext.Provider value = {{quizzes,setQuizzes,quizDetails,setQuizDetails}}>{children}</CreateQuizContext.Provider>
    )
}

export const useQuizContext = () => {
   return useContext(CreateQuizContext);
}



