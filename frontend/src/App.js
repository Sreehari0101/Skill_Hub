import './App.css';
import TemplatedStudent from './Components/TemplatedStudent';
import TemplatedRecruiter from './Components/TemplatedRecruiter';
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./utils/ProtectedRoute"
import { AuthProvider } from './context/AuthContext'
import Courses from './pages/Student/Courses';
import JoinChat from './pages/JoinChat';
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
import MentorUpload from './pages/Mentor/MentorUpload';
import MentorUploadNotes from './pages/Mentor/MentorUploadNotes';
import TemplatedMentor from './Components/TemplatedMentor';
import RecruitmentsView from './pages/Recruiter/RecruitmentsView';
import CourseDetails from './pages/Student/CourseDetails';
import MyCourseDetails from './pages/Student/MyCourseDetails';
import MentorCourseDetails from './pages/Mentor/MentorCourseDetails';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="App overflow-x-hidden">
      <AuthProvider>
       <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <StudentDashboard/> </TemplatedStudent> </ProtectedRoute>  } />
        <Route path="/student-courses" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <Courses/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/discussions-join" element={ <JoinChat/>} />
        <Route path="/student-course-details/:courseId" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <CourseDetails/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-mycourse-details/:courseId" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <MyCourseDetails/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-recruitments" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <Recruitments/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-recruitments-apply/:jobId" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <RecruitmentsApply/> </TemplatedStudent> </ProtectedRoute>} />
        <Route path="/student-chatbot" element={<ProtectedRoute allowedRoles={["student"]}> <TemplatedStudent> <Chatbot/> </TemplatedStudent> </ProtectedRoute>} />

        <Route path="/recruiter-dashboard" element={<ProtectedRoute allowedRoles={["recruiter"]}> <TemplatedRecruiter> <RecruiterDashboard/> </TemplatedRecruiter> </ProtectedRoute>} />
        <Route path="/recruiter-create" element={<ProtectedRoute allowedRoles={["recruiter"]}> <TemplatedRecruiter> <RecruiterCreate/> </TemplatedRecruiter> </ProtectedRoute>} />
        <Route path="/recruiter-profile" element={<ProtectedRoute allowedRoles={["recruiter"]}> <TemplatedRecruiter> <RecruiterProfile/> </TemplatedRecruiter> </ProtectedRoute>} />
        <Route path="/recruiter-recruitments-view/:jobId" element={<ProtectedRoute allowedRoles={["recruiter"]}> <TemplatedRecruiter> <RecruitmentsView/> </TemplatedRecruiter> </ProtectedRoute>} />

        <Route path="/mentor-dashboard" element={<ProtectedRoute allowedRoles={["mentor"]}> <TemplatedMentor> <MentorDashboard/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-course-details/:courseId" element={<ProtectedRoute allowedRoles={["mentor"]}> <TemplatedMentor> <MentorCourseDetails/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-create" element={<ProtectedRoute allowedRoles={["mentor"]}> <TemplatedMentor> <MentorCreate/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-upload/:courseId" element={<ProtectedRoute allowedRoles={["mentor"]}> <TemplatedMentor> <MentorUpload/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-upload-notes/:courseId" element={<ProtectedRoute allowedRoles={["mentor"]}> <TemplatedMentor> <MentorUploadNotes/> </TemplatedMentor> </ProtectedRoute>} />
        <Route path="/mentor-profile" element={<ProtectedRoute allowedRoles={["mentor"]}> <TemplatedMentor> <MentorProfile/> </TemplatedMentor>  </ProtectedRoute> } />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      </AuthProvider>
    </div>
  ); 
}
  
export default App;