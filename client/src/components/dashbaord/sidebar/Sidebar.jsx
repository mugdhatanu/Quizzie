
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useModalContext } from '../../../context/ModalContext';
import Modal from '../../modal/Modal';


const Sidebar = () => {
  const navigate = useNavigate();
  const {setShowModal} = useModalContext();
  const {pathname} = useLocation();
  let show = false;
  if(pathname === "/dashboard" || pathname.includes('analytics')) show = true;
  const nav = (route) => {
    setShowModal({initQuiz: false,initQuestions: false, edit: false})
    navigate(route);
  }
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <>
      <div className = {`${styles["sidebar"]} ${show ? "": styles["hide"]}`}>
        <h1>QUIZZIE</h1>
        <div className = {styles["navigate"]}>
          <button onClick={() => nav("/dashboard")}>Dashboard</button>
          <button onClick={() => nav("/analytics")}>Analytics</button>
          <button onClick={() => setShowModal(prev => ({...prev,initQuiz: !prev.initQuiz, edit: false}))}>Create Quiz</button>
        </div>
        <div className= {styles["logout"]}>
          <hr className= {styles["line"]}/>
          <button onClick={logout}>LOGOUT</button>
        </div>
      </div>
      {show && <Modal />}
    </>
  
  )
}

export default Sidebar
