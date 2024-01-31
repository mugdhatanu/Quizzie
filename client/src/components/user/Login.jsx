import { useState } from 'react';
import { login, toastError, toastSuccess } from '../../apis/user';
import styles from './User.module.css'
import setValueInLocal from './../../utils/localStorage/setValueInLocal';
import { useNavigate } from 'react-router-dom';
import { loginCheck } from '../../utils/validation/userForm';


const Login = () => {
  const [userDetails,setUserDetails] = useState({email :'', password: ''});
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  const loginUser = async(e) => {
    e.preventDefault();
    if(loginCheck(userDetails)) {
      try {
        const res = await login(userDetails);
        setValueInLocal("token",res.token,res.exp);
        toastSuccess("logged in");
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
    <form className= {styles["login"]} onSubmit = {loginUser}>
      <div>
        <label htmlFor="email">Email</label>
        <div className= {styles['input-field']}>
          <input 
          type="text" 
          value = {userDetails.email} 
          onChange = {(e) => setUserDetails(prev => ({...prev,email: e.target.value}))} 
          name = "email" 
          id = "email"
          />
          {error && !userDetails.email && <p className = {styles['error-text']}>Invalid email</p>}
        </div>
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="password">Password</label>
        <div className= {styles['input-field']}>
          <input 
          type="password" 
          value = {userDetails.password} 
          onChange = {(e) => setUserDetails(prev => ({...prev,password: e.target.value}))} 
          name = "password" 
          id = "password" />
          {error && !userDetails.password && <p className = {styles['error-text']}>Invalid password</p>}
        </div>
      </div>
      <button className= {styles["login-btn"]}>Log in</button>
    </form>
  )
}

export default Login
