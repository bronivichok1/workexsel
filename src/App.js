import './App.css';
import Main from './pages/Main';
import Create from './pages/Create'
import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="Create" element={<Create/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>   

  );
}

export default App;
