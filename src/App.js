import './App.css';
import Auth from './pages/Auth'
import Main from './pages/Main';
import Main2 from './pages/Main2';
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
        <Route path="Main2" element={<Main2/>} />
        <Route path="Main/Create" element={<Create/>} />
        <Route path="Main/Edit" element={<Edit/>}/>
        <Route path="Main2/Edit" element={<Edit/>}/>
        <Route path="Main/Total" element={<Total/>}/>
        <Route path="Main2/Total" element={<Total/>}/>
        <Route path="Main/Edit/TotalEdit" element={<TotalEdit/>}/>
        <Route path="Main2/Edit/TotalEdit" element={<TotalEdit/>}/>
        <Route path="Main/Edit/Clock" element={<Clock/>}/>
        <Route path="Main2/Edit/Clock" element={<Clock/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>   

  );
}

export default App;
