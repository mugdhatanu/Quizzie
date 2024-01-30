import { useState } from 'react';
import { login, toastError, toastSuccess } from '../../apis/user';
import styles from './User.module.css'
import setValueInLocal from './../../utils/localStorage/setValueInLocal';
import { useNavigate } from 'react-router-dom';
import { loginCheck } from '../../utils/validation/userForm';


const Login = () => {
  const [userDetails,setUserDetails] = useState({email :'', password: ''});
  const [toSend,setToSend] = useState(false);
  const navigate = useNavigate();
  const loginUser = async(e) => {
    e.preventDefault();
    setToSend(true);
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
    }
    }
    

  return (
    <form className= {styles["login"]} onSubmit = {loginUser}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
        type="text" 
        value = {userDetails.email} 
        placeholder= {toSend && !userDetails.email ? "Invalid email": ""}
        onChange = {(e) => setUserDetails(prev => ({...prev,email: e.target.value}))} 
        name = "email" 
        id = "email"
        />
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="password">Password</label>
        <input 
        type="text" 
        value = {userDetails.password} 
        placeholder= {toSend && !userDetails.password ? "Invalid password": ""}
        onChange = {(e) => setUserDetails(prev => ({...prev,password: e.target.value}))} 
        name = "password" 
        id = "password" />
      </div>
      <button className= {styles["login-btn"]}>Log in</button>
    </form>
  )
}

export default Login
