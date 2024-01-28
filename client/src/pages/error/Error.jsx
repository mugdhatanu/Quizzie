import styles from './Error.module.css'



const Error = () => {
  return (
    <div className= {styles["error"]}>
      <h1>404</h1>
      <h3>Page Not Found</h3>
    </div>
  )
}

export default Error
