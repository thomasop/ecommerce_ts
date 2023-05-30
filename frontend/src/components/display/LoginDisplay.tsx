import React, { FormEvent, useState } from "react";
import LoginFetch from "../fetch/LoginFetch";

const LoginDisplay = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const [sendForm, setSendForm] = useState<boolean>(false);

  const handlerEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mailregex = /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/;
    if (mailregex.test(e.target.value)) {
      setEmailInputError("");
      setEmail(e.target.value);
      setValidEmailInput(true);
    } else if (e.target.value.length === 0) {
      setEmailInputError("Email : need to be not empty");
      setEmail(e.target.value);
      setValidEmailInput(false);
    } else {
      setEmailInputError("Email : need to be valid email");
      setEmail(e.target.value);
      setValidEmailInput(false);
    }
  };
  const handlerPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (e.target.value.length > 3) {
      setPasswordInputError("");
      setPassword(e.target.value);
      setValidPasswordInput(true);
    } else if (e.target.value.length === 0) {
      setPasswordInputError("Password : need to be not empty");
      setPassword(e.target.value);
      setValidPasswordInput(false);
    } else {
      setPasswordInputError(
        "Password : need to have one maj, one min, one number and 8 carac min"
      );
      setPassword(e.target.value);
      setValidPasswordInput(false);
    }
  };
  const handlerRememberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validEmailInput === true && validPasswordInput === true) {
      setSendForm(true);
    }
  };
  return (
    <>
      {sendForm === true && (
        <LoginFetch
          email={email}
          password={password}
          remember={remember}
          setSendForm={setSendForm}
          setServerError={setServerError}
          setEmailInputError={setEmailInputError}
          setPasswordInputError={setPasswordInputError}
        />
      )}

      <form
        action=""
        onSubmit={(e) => {
          handlerSubmit(e);
        }}
      >
        <div>
          <label>Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              handlerEmailInput(e);
            }}
          />
          <div className="divError email">{emailInputError}</div>
        </div>
        <div>
          <label htmlFor="">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              handlerPasswordInput(e);
            }}
          />
          <div className="divError password">{passwordInputError}</div>
        </div>
        <div>
          <label htmlFor="">Remember : </label>
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={(e) => {
              handlerRememberInput(e);
            }}
          />
        </div>
        <div>
          <input type="submit" name="send" value={"Se connecter"} />
        </div>
        <div className="divErrors">{serverError}</div>
      </form>
    </>
  );
};

export default LoginDisplay;
