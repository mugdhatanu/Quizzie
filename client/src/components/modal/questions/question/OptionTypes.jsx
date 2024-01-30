import { useModalContext } from "../../../../context/ModalContext";
import { useQuizContext } from "../../../../context/QuizContext"
import styles from './../CreateQuestion.module.css'

const OptionTypes = () => {
    const {showModal} = useModalContext();
    const {quizDetails,setQuizDetails} = useQuizContext();
    const {optionsType} = quizDetails;
    return (
        <div className = {styles["option-types"]}>
            <p>Option Type</p>
            <div className= {styles["types"]}>
                <div>
                    <button disabled = {showModal.edit} onClick = {() => setQuizDetails(prev => ({...prev,optionsType: 'Text'}))} >
                        <div className= {optionsType === "Text" ? styles["select"]: ""}></div>
                    </button>
                    <p>Text</p>
                </div>
                <div>
                    <button disabled = {showModal.edit} onClick = {() => setQuizDetails(prev => ({...prev,optionsType: 'Image'}))} >
                        <div className= {optionsType === "Image" ? styles["select"]: ""}></div>
                    </button>
                    <p>Image URL</p>
                </div>
                <div>
                    <button disabled = {showModal.edit} className = {styles["last-btn"]} onClick = {() => setQuizDetails(prev => ({...prev,optionsType: 'Text-Image'}))}>
                        <div className= {optionsType === "Text-Image" ? styles["select"]: ""}></div>
                    </button>
                    <p>Text and Image URL</p>
                </div>
            </div>
            
        </div>
    )
}

export default OptionTypes
