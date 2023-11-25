import './App.css';
import Sidebar from './Components/Sidebar';
import './index.css';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
    <div className="App">
     <h1 className="text-5xl">
      Hello world!
    </h1>
    </div>
    </NextUIProvider>
  ); 
}

export default App;
