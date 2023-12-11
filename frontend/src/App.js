import './App.css';
import TemplatedStudent from './Components/TemplatedStudent';
import TemplatedRecruiter from './Components/TemplatedRecruiter';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Chatroom from './pages/Chatroom';
import JoinChat from './pages/JoinChat';
import Recruitments from './pages/Recruitments';
import RecruitmentsApply from './pages/RecruitmentsApply';
import Chatbot from './pages/Chatbot';
import Home from './pages/Home';
import './index.css';
import RecruiterDashboard from './pages/RecruiterDashboard';
import RecruiterCreate from './pages/RecruiterCreate';
import RecruiterProfile from './pages/RecruiterProfile';

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student-dashboard" element={<TemplatedStudent> <Dashboard/> </TemplatedStudent>} />
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
