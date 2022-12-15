import React from 'react';
import './App.css';
import {
  Route,
  Routes,
  Link
} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LoginView from "./Views/LoginView";
import RegistrationView from "./Views/RegistrationView";
import Home from "./Views/Home";

function App() {



  return <>
    <nav>
      <ul>
        <li>
          <Link to="/">Домашняя страница</Link>
        </li>
        <li>
          <Link to="/registration">Регстрация</Link>
        </li>
        <li>
          <Link to="/login">Логин</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path='/login' element={<LoginView/>} />
      <Route path='/registration' element={<RegistrationView/>} />
      <Route path='/' element={<Home/>} />
    </Routes>

  </>;
}

export default App;
