import React, { useState } from "react";
import LoginDisplay from "../components/display/LoginDisplay";
import RegisterDisplay from "../components/display/RegisterDisplay";

const Login = () => {
  const [page, setPage] = useState<string>("login");
  return (
    <>
      {(page === "login" && (
        <div className="login">
          <LoginDisplay setPage={setPage} />
        </div>
      )) ||
        (page === "register" && (
          <div className="register">
            <RegisterDisplay setPage={setPage} />
          </div>
        ))}
    </>
  );
};

export default Login;
