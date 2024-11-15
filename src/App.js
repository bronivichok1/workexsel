import './App.css';
import Auth from './pages/Auth'
import Main from './pages/Main';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Total from './pages/Total'
import TotalEdit from './pages/TotalEdit';
import Clock from "./pages/Clock"
import {  BrowserRouter, Routes, Route} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="Main" element={<Main/>} />
        <Route path="Create" element={<Create/>} />
        <Route path="Edit" element={<Edit/>}/>
        <Route path="Total" element={<Total/>}/>
        <Route path="Edit/TotalEdit" element={<TotalEdit/>}/>
        <Route path="Edit/Clock" element={<Clock/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>   

  );
}

export default App;
