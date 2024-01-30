import { useState } from 'react'
import styles from './User.module.css'
import { register } from '../../apis/user';
import setValueInLocal from '../../utils/localStorage/setValueInLocal';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userDetails,setUserDetails] = useState({name: '',email: '', password: '', confirmPass: ''});
  const navigate = useNavigate();
  const registerUser = async(e) => {
    e.preventDefault();
    const data = await register(userDetails);
    setValueInLocal("token",data.token,data.exp);
    navigate("/dashboard");
  }

  return (
    <form className= {styles["register"]} onSubmit = {registerUser}>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" value = {userDetails.name} onChange = {(e) => setUserDetails(prev => ({...prev,name: e.target.value}))} name = "email" id = "name" />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" value = {userDetails.email} onChange = {(e) => setUserDetails(prev => ({...prev,email: e.target.value}))} name = "email" id = "email" />
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="">Password</label>
        <input type="text" value = {userDetails.password} onChange = {(e) => setUserDetails(prev => ({...prev,password: e.target.value}))} name = "password" id = "password" />
      </div>
      <div className= {styles["confirm-pass"]}>
        <label htmlFor="">Confirm Password</label>
        <input type="text" value = {userDetails.confirmPass} onChange = {(e) => setUserDetails(prev => ({...prev,confirmPass: e.target.value}))} name = "confirm-pass" id = "confirm-pass" />
      </div>
      <button className= {styles["sign-up"]}>Sign Up</button>
    </form>
  )
}

export default Register
