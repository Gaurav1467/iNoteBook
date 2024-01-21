import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/note/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message,type)=> {
    setAlert({
      msg : message,
      type : type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
}
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <div className="sticky-top">
        <Navbar />
        <Alert alert = {alert} />
        </div>
        <Routes>
          <Route path="/" element={<Home showAlert = {showAlert} />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login showAlert = {showAlert} />} />
          <Route path="signup" element={<SignUp showAlert = {showAlert} />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
