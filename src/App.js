import './App.css';
import Main from './pages/Main';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Total from './pages/Total'
import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="Create" element={<Create/>} />
        <Route path="Edit" element={<Edit/>}/>
        <Route path="Total" element={<Total/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>   

  );
}

export default App;
