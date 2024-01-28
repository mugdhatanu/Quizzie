import styles from './User.module.css'


const Login = () => {
  return (
    <form className= {styles["login"]}>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" name = "email" id = "email" />
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="">Password</label>
        <input type="text" name = "password" id = "password" />
      </div>
      <button className= {styles["login-btn"]}>Log in</button>
    </form>
  )
}

export default Login
