import { useState } from 'react'
import styles from './User.module.css'
import { signUp } from '../../apis/user';
import setValueInLocal from '../../utils/localStorage/setValueInLocal';
import { useNavigate } from 'react-router-dom';
import { registerCheck } from '../../utils/validation/userForm';

const Register = () => {
  const [userDetails,setUserDetails] = useState({name: '',email: '', password: '', confirmPass: ''});
  const [toSend,setToSend] = useState(false);
  const navigate = useNavigate();
  const registerUser = async(e) => {
    e.preventDefault();
    setToSend(true);
    if(registerCheck(userDetails)) {
      try {
        const res = await signUp(userDetails);
        setValueInLocal("token",res.token,res.exp);
        toastSuccess("registered");
        setTimeout(() => {
          navigate("/dashboard");
        },1000);
      } catch(err) {
        toastError(err.response.data.msg);
      } 
    }
  }
  

  return (
    <form className= {styles["register"]} onSubmit = {registerUser}>
      <div>
        <label htmlFor="name">Name</label>
        <input 
        type="text" 
        value = {userDetails.name}
        onChange = {(e) => setUserDetails(prev => ({...prev,name: e.target.value}))}  
        name = "email" 
        id = "name" />
      </div>
      {toSend && !userDetails.name && <span className= {styles["error"]}>Invalid name</span>}
      <div>
        <label htmlFor="email">Email</label>
        <input 
        type="text" 
        value = {userDetails.email}
        onChange = {(e) => setUserDetails(prev => ({...prev,email: e.target.value}))} 
        name = "email" 
        id = "email" />
      </div>
      {toSend && !userDetails.email && <span className= {styles["error"]}>Invalid Email</span>}
      <div className= {styles["password"]}>
        <label htmlFor="password">Password</label>
        <input 
        type="text" 
        value = {userDetails.password} 
        onChange = {(e) => setUserDetails(prev => ({...prev,password: e.target.value}))} 
        name = "password" 
        id = "password" />
      </div>
      <div className= {styles["confirm-pass"]}>
        <label htmlFor="confirm-pass">Confirm Password</label>
        <input 
        type="text" 
        value = {userDetails.confirmPass}  
        onChange = {(e) => setUserDetails(prev => ({...prev,confirmPass: e.target.value}))} 
        name = "confirm-pass" 
        id = "confirm-pass" />
      </div>
      {toSend && userDetails.password !== userDetails.confirmPass && <span className= {styles["error"]}>Passwords dont match</span>}
      <button className= {styles["sign-up"]}>Sign Up</button>
    </form>
  )
}

export default Register
