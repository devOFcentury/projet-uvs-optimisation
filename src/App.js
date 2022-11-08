import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import './App.css';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Navigate to='/login'/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/home/*" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
