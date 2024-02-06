import './App.css';
import TemplatedStudent from './Components/TemplatedStudent';
import TemplatedRecruiter from './Components/TemplatedRecruiter';
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./utils/ProtectedRoute"
import { AuthProvider } from './context/AuthContext'
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
import MentorDashboard from './pages/Mentor/MentorDashboard';
import MentorCreate from './pages/Mentor/MentorCreate';
import MentorProfile from './pages/Mentor/MentorProfile';
import TemplatedMentor from './Components/TemplatedMentor';
import RecruitmentsView from './pages/Recruiter/RecruitmentsView';
import CourseDetails from './pages/Student/CourseDetails';

function App() {
  return (
    <div className="App overflow-x-hidden">
      <AuthProvider>
       <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/student-dashboard" element={<ProtectedRoute> <TemplatedStudent> <StudentDashboard/> </TemplatedStudent> </ProtectedRoute>  } />
        <Route path="/student-courses" element={<ProtectedRoute> <TemplatedStudent> <Courses/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-discussions" element={<ProtectedRoute> <TemplatedStudent> <Chatroom/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-discussions-join" element={<ProtectedRoute> <TemplatedStudent> <JoinChat/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-course-details" element={<ProtectedRoute> <TemplatedStudent> <CourseDetails/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-recruitments" element={<ProtectedRoute> <TemplatedStudent> <Recruitments/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-recruitments-apply" element={<ProtectedRoute> <TemplatedStudent> <RecruitmentsApply/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-chatbot" element={<ProtectedRoute> <TemplatedStudent> <Chatbot/> </TemplatedStudent> </ProtectedRoute>} />

        <Route path="/recruiter-dashboard" element={<ProtectedRoute> <TemplatedRecruiter> <RecruiterDashboard/> </TemplatedRecruiter> </ProtectedRoute>} />
        <Route path="/recruiter-create" element={<ProtectedRoute> <TemplatedRecruiter> <RecruiterCreate/> </TemplatedRecruiter> </ProtectedRoute>} />
        <Route path="/recruiter-profile" element={<ProtectedRoute> <TemplatedRecruiter> <RecruiterProfile/> </TemplatedRecruiter> </ProtectedRoute>} />
        <Route path="/recruiter-recruitments-view" element={<ProtectedRoute> <TemplatedRecruiter> <RecruitmentsView/> </TemplatedRecruiter> </ProtectedRoute>} />

        <Route path="/mentor-dashboard" element={<ProtectedRoute> <TemplatedMentor> <MentorDashboard/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-create" element={<ProtectedRoute> <TemplatedMentor> <MentorCreate/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-profile" element={<ProtectedRoute> <TemplatedMentor> <MentorProfile/> </TemplatedMentor>  </ProtectedRoute> } />
      </Routes>
      </AuthProvider>
    </div>
  ); 
}

export default App;