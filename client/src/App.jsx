import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Analytics from './pages/analytics/Analytics';
import Sidebar from './components/dashbaord/sidebar/Sidebar';
import { useEffect } from 'react';
import styles from './App.module.css';
import { getQuizzes } from './apis/quiz';
import {  useQuizContext } from './context/QuizContext';
import QuestionAnalysis from './pages/questions/QuestionAnalysis';
import Auth from './pages/auth/Auth';
import PlayQuiz from './pages/quiz/PlayQuiz';
import Error from './pages/error/Error';


function App() {
  const {setQuizzes} = useQuizContext();
  useEffect(() => {
    const allQuizzes = async() => {
      const getAllQuizzes = await getQuizzes();
      setQuizzes(getAllQuizzes);
    }
    allQuizzes();
  },[]);


  return (
    <div className = {styles["app"]}>
        <Router>
          <Sidebar/>
          <Routes>
            <Route path = "*" element = {<Error />} />
            <Route path = "/" element = {<Auth />} />
            <Route path = "/dashboard" element = {<Dashboard/>} />
            <Route path = "/analytics" element = {<Analytics/>} />
            <Route path= "/analytics/:quiz_id" element = {<QuestionAnalysis />} />
            <Route path= "/quizzes/:quiz_id" element = {<PlayQuiz />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
