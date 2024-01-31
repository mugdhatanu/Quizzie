import { useModalContext } from "../../../../context/ModalContext";
import styles from './../CreateQuestion.module.css'

const OptionTypes = ({optionsType,setOptionsType}) => {
    const {showModal} = useModalContext();
    const selectValue = (value) => {
        localStorage.setItem("optionsType",value);
        setOptionsType(value);
    }
    return (
        <div className = {styles["option-types"]}>
            <p>Option Type</p>
            <div className= {styles["types"]}>
                <div>
                    <button disabled = {showModal.edit} onClick = {() => selectValue("Text")} >
                    <div className= {optionsType === "Text" || optionsType === "Text" ? styles["select"]: ""}></div>
                    </button>
                    <p>Text</p>
                </div>
                <div>
                    <button disabled = {showModal.edit} onClick = {() => selectValue("Image")} >
                        <div className= {optionsType === "Image" || optionsType === "Image" ? styles["select"]: ""}></div>
                    </button>
                    <p>Image URL</p>
                </div>
                <div>
                    <button disabled = {showModal.edit} className = {styles["last-btn"]} onClick = {() => selectValue("Text-Image")}>
                        <div className= {optionsType === "Text-Image" || optionsType === "Text-Image" ? styles["select"]: ""}></div>
                    </button>
                    <p>Text and Image URL</p>
                </div>
            </div>
            
        </div>
    )
}

export default OptionTypes
