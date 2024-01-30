import { useState } from "react"
import Register from "../../components/user/Register"
import Login from "../../components/user/Login"
import styles from './Auth.module.css'
import { Toaster } from "react-hot-toast"


const Auth = () => {
    const [selectBtn,setSelectBtn] = useState({login: false, register: true});
    return (
        <div className= {styles["auth"]}>
            <Toaster />
            <div className= {styles["auth-container"]}>
                <h1>QUIZZIE</h1>
                <div className= {styles["toggle-btns"]}>
                    <button onClick={() => setSelectBtn({login: false, register: true})} className= {selectBtn.register ? styles["select"]: ""}>Sign Up</button>
                    <button onClick={() => setSelectBtn({login: true, register: false})} className= {selectBtn.login ? styles["select"]: ""}>Log In</button>
                </div>
                {selectBtn.register ? 
                <Register /> :
                <Login />
                }
            </div>
        </div>
    )
}

export default Auth
