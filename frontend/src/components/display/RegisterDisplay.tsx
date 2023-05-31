import React, { Dispatch, SetStateAction, useState } from "react";
import RegisterFetch from "../fetch/RegisterFetch";

interface Proptype {
    setPage: Dispatch<SetStateAction<string>>
}
const RegisterDisplay: React.FC<Proptype> = ({setPage}) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordComfirm, setPasswordComfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstnameInputError, setFirstnameInputError] = useState<string>("");
  const [lastnameInputError, setLastnameInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [passwordComfirmInputError, setPasswordComfirmError] =
    useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [validInputFirstname, setValidInputFirstname] =
    useState<boolean>(false);
  const [validInputLastname, setValidInputLastname] = useState<boolean>(false);
  const [validInputPassword, setValidInputPassword] = useState<boolean>(false);
  const [validInputPasswordComfirm, setValidInputPasswordComfirm] =
    useState<boolean>(false);
  const [validInputEmail, setValidInputEmail] = useState<boolean>(false);
  const [sendform, setSendForm] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  const handlerFirstnameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setValidInputFirstname(true);
      setFirstnameInputError("");
      setFirstname(e.target.value);
    } else if (e.target.value.length === 0) {
      setValidInputFirstname(false);
      setFirstnameInputError("Firstname : need to be not empty");
      setFirstname(e.target.value);
    } else {
      setValidInputFirstname(false);
      setFirstnameInputError("Firstname : need to have 3 carac min");
      setFirstname(e.target.value);
    }
  };
  const handlerLastnameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setValidInputLastname(true);
      setLastnameInputError("");
      setLastname(e.target.value);
    } else if (e.target.value.length === 0) {
      setValidInputLastname(false);
      setLastnameInputError("Lastname : need to be not empty");
      setLastname(e.target.value);
    } else {
      setValidInputLastname(false);
      setLastnameInputError("Lastname : need to have 3 carac min");
      setLastname(e.target.value);
    }
  };
  const handlerPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setValidInputPassword(true);
      setPasswordInputError("");
      setPassword(e.target.value);
    } else if (e.target.value.length === 0) {
      setValidInputPassword(false);
      setPasswordInputError("Password : need to be not empty");
      setPassword(e.target.value);
    } else {
      setValidInputPassword(false);
      setPasswordInputError("Password : need to have 3 carac min");
      setPassword(e.target.value);
    }
  };
  const handlerPasswordComfirmInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (password === e.target.value) {
      setValidInputPasswordComfirm(true);
      setPasswordComfirmError("");
      setPasswordComfirm(e.target.value);
    } else if (e.target.value.length === 0) {
      setValidInputPasswordComfirm(false);
      setPasswordComfirmError("Password Comfirm : need to be not empty");
      setPasswordComfirm(e.target.value);
    } else {
      setValidInputPasswordComfirm(false);
      setPasswordComfirmError("Password Comfirm : the two passwords are not identical");
      setPasswordComfirm(e.target.value);
    }
  };
  const handlerEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setValidInputEmail(true);
      setEmailInputError("");
      setEmail(e.target.value);
    } else if (e.target.value.length === 0) {
      setValidInputEmail(false);
      setEmailInputError("Email : need to be not empty");
      setEmail(e.target.value);
    } else {
      setValidInputEmail(false);
      setEmailInputError("Email : need to have 3 carac min");
      setEmail(e.target.value);
    }
  };
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      validInputEmail === true &&
      validInputFirstname === true &&
      validInputLastname === true &&
      validInputPassword === true &&
      validInputPasswordComfirm === true
    ) {
      setSendForm(true);
    }
  };
  return (
    <>
      {sendform === true && (
        <RegisterFetch
          firstname={firstname}
          lastname={lastname}
          password={password}
          email={email}
          setSendForm={setSendForm}
          setFirstnameInputError={setFirstnameInputError}
          setLastnameInputError={setLastnameInputError}
          setPasswordInputError={setPasswordInputError}
          setEmailInputError={setEmailInputError}
          setServerError={setServerError}
          setPage={setPage}
        />
      )}
      <form
        action=""
        onSubmit={(e) => {
          handlerSubmit(e);
        }}
      >
        <h1>Se créer un compte</h1>
        <div>
          <label>Firstname</label>
          <input
            type="text"
            onChange={(e) => {
              handlerFirstnameInput(e);
            }}
            value={firstname}
          />
          <div>{firstnameInputError}</div>
        </div>
        <div>
          <label>Lastname</label>
          <input
            value={lastname}
            type="text"
            onChange={(e) => {
              handlerLastnameInput(e);
            }}
          />
          <div>{lastnameInputError}</div>
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => {
              handlerPasswordInput(e);
            }}
          />
          <div>{passwordInputError}</div>
        </div>
        <div>
          <label>Password comfirm</label>
          <input
            value={passwordComfirm}
            type="password"
            onChange={(e) => {
              handlerPasswordComfirmInput(e);
            }}
          />
          <div>{passwordComfirmInputError}</div>
        </div>
        <div>
          <label>Email</label>
          <input
            value={email}
            type="email"
            onChange={(e) => {
              handlerEmailInput(e);
            }}
          />
          <div>{emailInputError}</div>
        </div>
        <div>{serverError}</div>
        <div>
          <input type="submit" value="Se créer un compte" />
        </div>
      </form>
    </>
  );
};

export default RegisterDisplay;
