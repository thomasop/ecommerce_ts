import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Proptype {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  setSendForm: Dispatch<SetStateAction<boolean>>;
  setFirstnameInputError: Dispatch<SetStateAction<string>>;
  setLastnameInputError: Dispatch<SetStateAction<string>>;
  setPasswordInputError: Dispatch<SetStateAction<string>>;
  setEmailInputError: Dispatch<SetStateAction<string>>;
  setServerError: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<string>>;
}

interface Data {
    result: Result
}

interface Result {
    error: string
    errorsBody: ErrorsBody
    status: number
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

const RegisterFetch: React.FC<Proptype> = ({
  firstname,
  lastname,
  password,
  email,
  setSendForm,
  setFirstnameInputError,
  setLastnameInputError,
  setPasswordInputError,
  setEmailInputError,
  setServerError,
  setPage
}) => {
    const navigate = useNavigate()
  useEffect(() => {
    const register = async () => {
      const response = await fetch("http://localhost:8080/user/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: email,
        }),
      });
      const json: Data = await response.json();
      if (json.result.status === 400) {
        setSendForm(false)
        if (json.result.errorsBody) {
            json.result.errorsBody.errors.map((error) => {
                if (error.path === 'firstname') {
                    setFirstnameInputError(error.msg)
                } else if (error.path === 'lastname') {
                    setLastnameInputError(error.msg)
                } else if (error.path === 'passwordd') {
                    setPasswordInputError(error.msg)
                } else if (error.path === 'email') {
                    setEmailInputError(error.msg)
                }
                return null
            })
        }
      } else if (json.result.status === 200) {
        setSendForm(false)
        setPage('login')
      } else {
        setSendForm(false)
        setServerError(json.result.error)
      }
    };
    register();
  });
  return null;
};

export default RegisterFetch;
