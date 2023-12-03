import './App.css';
import {Routes, Route} from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student-discussions" element={<Chatroom/>} /> 
      </Routes>
    </div>
  ); 
}

export default App;
