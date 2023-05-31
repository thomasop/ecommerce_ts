import React, { useState } from "react";
import LoginDisplay from "../components/display/LoginDisplay";
import RegisterDisplay from "../components/display/RegisterDisplay";
import CheckUserLog from "../components/CheckUserLog";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

const Login = () => {
  const [page, setPage] = useState<string>("login");
  const { status, token } = useSelector((state: RootState) => state.Auth);
  return (
    <>
      <CheckUserLog page={'login'} />
      {(status.length > 0 && token.length > 0 && <div>log</div>) ||
        (status.length === 0 && token.length === 0 && (
          <div>
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
          </div>
        ))}
    </>
  );
};

export default Login;
