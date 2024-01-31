import { useState } from 'react'
import styles from './User.module.css'
import { signUp, toastError, toastSuccess } from '../../apis/user';
import setValueInLocal from '../../utils/localStorage/setValueInLocal';
import { useNavigate } from 'react-router-dom';
import { registerCheck } from '../../utils/validation/userForm';

const Register = () => {
  const [userDetails,setUserDetails] = useState({name: '',email: '', password: '', confirmPass: ''});
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  const registerUser = async(e) => {
    e.preventDefault();
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
    } else {
      setError(true);
    }
  }
  
  return (
    <form className= {styles["register"]} onSubmit = {registerUser}>
      <div>
        <label htmlFor="name">Name</label> 
        <div className = {styles['input-field']}>
          <input 
          type="text" 
          value = {userDetails.name}
          onChange = {(e) => setUserDetails(prev => ({...prev,name: e.target.value}))}  
          name = "email" 
          id = "name" />
          {error && !userDetails.name && <p className = {styles['error-text']}>Invalid name</p>}
        </div>   
      </div>
      <div>
        <label htmlFor="email">Email</label>  
        <div className = {styles['input-field']}>
          <input 
          type="text" 
          value = {userDetails.email}
          onChange = {(e) => setUserDetails(prev => ({...prev,email: e.target.value}))} 
          name = "email" 
          id = "email" />
          {error && !userDetails.email && <p className = {styles['error-text']}>Invalid email</p>}
        </div> 
       
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="password">Password</label> 
        <div className = {styles['input-field']}>
          <input 
          type="password" 
          className = {styles["register-pass"]}
          value = {userDetails.password} 
          onChange = {(e) => setUserDetails(prev => ({...prev,password: e.target.value}))} 
          name = "password" 
          id = "password" />
          {error && !userDetails.password && <p className = {styles['error-text']}>Invalid password</p>}
        </div>
        
      </div>
      <div className= {styles["confirm-pass"]}>
        <label htmlFor="confirm-pass">Confirm Password</label>
        <div className = {styles['input-field']}>
          <input 
          type="password" 
          value = {userDetails.confirmPass}  
          onChange = {(e) => setUserDetails(prev => ({...prev,confirmPass: e.target.value}))} 
          name = "confirm-pass" 
          id = "confirm-pass" />
        </div>
        {error && userDetails.password !== userDetails.confirmPass && <p className = {styles['error-text']}>Password doesnt match</p>}
      </div>
      
      <button className= {styles["sign-up"]}>Sign Up</button>
    </form>
  )
}

export default Register
