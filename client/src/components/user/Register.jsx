import styles from './User.module.css'

const Register = () => {
  return (
    <form className= {styles["register"]}>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name = "email" id = "name" />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" name = "email" id = "email" />
      </div>
      <div className= {styles["password"]}>
        <label htmlFor="">Password</label>
        <input type="text" name = "password" id = "password" />
      </div>
      <div className= {styles["confirm-pass"]}>
        <label htmlFor="">Confirm Password</label>
        <input type="text" name = "confirm-pass" id = "confirm-pass" />
      </div>
      <button className= {styles["sign-up"]}>Sign Up</button>
    </form>
  )
}

export default Register
