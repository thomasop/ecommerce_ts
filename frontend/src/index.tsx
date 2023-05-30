import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Profil from './pages/Profil';
import "./css/style.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/progil' element={<Profil />} />
    <Route path='/*' element={<Home />} />
  </Routes>
  </BrowserRouter>
);
