import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Proptype {
  email: string;
  password: string;
  remember: boolean;
  setSendForm: Dispatch<SetStateAction<boolean>>;
  setServerError: Dispatch<SetStateAction<string>>;
  setEmailInputError: Dispatch<SetStateAction<string>>;
  setPasswordInputError: Dispatch<SetStateAction<string>>;
}

interface Data {
  result: Result;
}

interface Result {
  status: number;
  user: User;
  token: string;
  error: "";
  errorsBody: ErrorsBody;
}

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}


interface ErrorsBody {
  errors: Error[];
}

interface Error {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const LoginFetch: React.FC<Proptype> = ({
  email,
  password,
  remember,
  setSendForm,
  setServerError,
  setEmailInputError,
  setPasswordInputError,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const login = async () => {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json: Data = await response.json();
      console.log(json);
      if (json.result.status === 200) {
        setSendForm(false);
        setServerError(json.result.error);
        if (remember === true) {
          let expires = new Date();
          expires.setFullYear(expires.getFullYear() + 1);
          document.cookie = `token=${json.result.token};expires=${expires}; path=/`;
          navigate("/");
        } else {
          document.cookie = `token=${json.result.token}; path=/`;
          navigate("/");
        }
      } else if (json.result.status === 404) {
        setSendForm(false);
        setServerError(json.result.error);
      } else {
        setServerError(json.result.error);
        setSendForm(false);
        if (json.result.errorsBody.errors) {
          json.result.errorsBody.errors.map((error) => {
            if (error.path === "password") {
              setEmailInputError(error.msg);
            } else if (error.path === "email") {
              setPasswordInputError(error.msg);
            }
            return null;
          });
        }
      }
    };
    login();
  });
  return null;
};

export default LoginFetch;
