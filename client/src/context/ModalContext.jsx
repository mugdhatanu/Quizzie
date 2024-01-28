import { createContext, useState, useContext } from "react";


export const CreateModalContext = createContext("");

export const ModalContextProvider = ({children}) => {
    const [showModal,setShowModal] = useState({initQuiz: false,initQuestions: false, edit: false});
   
    return (
        <CreateModalContext.Provider value = {{showModal,setShowModal}}>{children}</CreateModalContext.Provider>
    )
}

export const useModalContext = () => {
   return useContext(CreateModalContext);
}



