import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Analytics from './pages/analytics/Analytics';
import Sidebar from './components/dashbaord/sidebar/Sidebar';
import styles from './App.module.css';
import QuestionAnalysis from './pages/questions/QuestionAnalysis';
import Auth from './pages/auth/Auth';
import PlayQuiz from './pages/quiz/PlayQuiz';
import Error from './pages/error/Error';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import { Toaster } from 'react-hot-toast';



function App() {

  return (
    <div className = {styles["app"]}>
        <Router>
          <Sidebar/>
          <Toaster />
          <Routes>
            <Route path = "*" element = {<Error />} />
            <Route path = "/" element = {<Auth />} />
            <Route path = "/dashboard" element = {<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
            <Route path = "/analytics" element = {<ProtectedRoutes><Analytics/></ProtectedRoutes>} />
            <Route path= "/analytics/:quiz_id" element = {<ProtectedRoutes><QuestionAnalysis /></ProtectedRoutes>} />
            <Route path= "/quizzes/play/:quiz_id" element = {<PlayQuiz />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
