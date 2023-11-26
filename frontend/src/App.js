import './App.css';
import Sidebar from './Components/Sidebar';
import './index.css';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
    <div className="App">
     <Sidebar/>
    </div>
    </NextUIProvider>
  ); 
}

export default App;
