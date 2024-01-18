import './App.css';
import TemplatedStudent from './Components/TemplatedStudent';
import TemplatedRecruiter from './Components/TemplatedRecruiter';
import {Routes, Route} from 'react-router-dom';
import Courses from './pages/Student/Courses';
import Chatroom from './pages/Student/Chatroom';
import JoinChat from './pages/Student/JoinChat';
import Recruitments from './pages/Student/Recruitments';
import RecruitmentsApply from './pages/Student/RecruitmentsApply';
import Chatbot from './pages/Student/Chatbot';
import './index.css';
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import RecruiterCreate from './pages/Recruiter/RecruiterCreate';
import RecruiterProfile from './pages/Recruiter/RecruiterProfile';
import StudentDashboard from './pages/Student/StudentDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/student-dashboard" element={<TemplatedStudent> <StudentDashboard/> </TemplatedStudent>} />
        <Route path="/student-courses" element={<TemplatedStudent> <Courses/> </TemplatedStudent>} />
        <Route path="/student-discussions" element={<TemplatedStudent> <Chatroom/> </TemplatedStudent>} />
        <Route path="/student-discussions-join" element={<TemplatedStudent> <JoinChat/> </TemplatedStudent>} />
        <Route path="/student-recruitments" element={<TemplatedStudent> <Recruitments/> </TemplatedStudent>} />
        <Route path="/student-recruitments-apply" element={<TemplatedStudent> <RecruitmentsApply/> </TemplatedStudent>} />
        <Route path="/student-chatbot" element={<TemplatedStudent> <Chatbot/> </TemplatedStudent>} />
        <Route path="/recruiter-dashboard" element={<TemplatedRecruiter> <RecruiterDashboard/> </TemplatedRecruiter>} />
        <Route path="/recruiter-create" element={<TemplatedRecruiter> <RecruiterCreate/> </TemplatedRecruiter>} />
        <Route path="/recruiter-profile" element={<TemplatedRecruiter> <RecruiterProfile/> </TemplatedRecruiter>} />

      </Routes>
    </div>
  ); 
}

export default App;
