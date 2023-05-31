import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import "./css/style.css";
import EmailValidation from "./pages/EmailValidation";
import { Provider } from "react-redux";
import store from "./utils/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/email-validation/:token" element={<EmailValidation />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
