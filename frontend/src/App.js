import './App.css';
import {Routes, Route} from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Recruitments from './pages/Recruitments';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student-discussions" element={<Chatroom/>} />
        <Route path="/student-recruitments" element={<Recruitments/>} />
        

      </Routes>
    </div>
  ); 
}

export default App;
