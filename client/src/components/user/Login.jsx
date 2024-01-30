import { useState } from 'react';
import { login } from '../../apis/user';
import styles from './User.module.css'
import setValueInLocal from './../../utils/localStorage/setValueInLocal';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [userDetails,setUserDetails] = useState({email :'', password: ''})
  const navigate = useNavigate();
  const loginUser = async(e) => {
    e.preventDefault();
    const data = await login(userDetails);
    setValueInLocal("token",data.token,data.exp);
    navigate("/dashboard");
  }

  return (
    <form className= {styles["login"]} onSubmit = {loginUser}>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" value = {userDetails.email} onChange = {(e) => setUserDetails(prev => ({...prev,email: e.target.value}))} name = "email" id = "email" />
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="">Password</label>
        <input type="text" value = {userDetails.password} onChange = {(e) => setUserDetails(prev => ({...prev,password: e.target.value}))} name = "password" id = "password" />
      </div>
      <button className= {styles["login-btn"]}>Log in</button>
    </form>
  )
}

export default Login
