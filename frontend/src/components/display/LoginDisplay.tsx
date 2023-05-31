import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import LoginFetch from "../fetch/LoginFetch";

interface Proptype {
  setPage: Dispatch<SetStateAction<string>>;
}

const LoginDisplay: React.FC<Proptype> = ({ setPage }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const [sendForm, setSendForm] = useState<boolean>(false);
  const refDivEmailError = useRef(null);
  const refDivPasswordError = useRef(null);

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
    } else {
      if (validEmailInput === false) {
        setEmailInputError("Email : need to be not empty");
      }
      if (validPasswordInput === false) {
        setPasswordInputError("Password : need to be not empty");
      }
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
        className="login__form"
        action=""
        onSubmit={(e) => {
          handlerSubmit(e);
        }}
      >
        <h1 className="login__h1">Se connecter</h1>
        <div className="login__div login__divEmail">
          <label className="login__label">Email : </label>
          <input
            className="login__input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              handlerEmailInput(e);
            }}
            required
          />
          <div className="login__divError">{emailInputError}</div>
        </div>
        <div className="login__div login__divPassword">
          <label className="login__label" htmlFor="">
            Password :{" "}
          </label>
          <input
            className="login__input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              handlerPasswordInput(e);
            }}
            required
          />
          <div className="login__divError">{passwordInputError}</div>
        </div>
        <div className="login__div login__divRemember">
          <label className="login__label" htmlFor="">
            Remember :{" "}
          </label>
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={(e) => {
              handlerRememberInput(e);
            }}
          />
        </div>
        <div className="login__divErrors">{serverError}</div>
        <div className="login__divSubmit">
          <input
            className="login__submit"
            type="submit"
            name="send"
            value={"Se connecter"}
          />
        </div>
        <div className="login__divSubmit login__divSubmit--margin">
          <button
            className="login__register"
            onClick={() => setPage("register")}
          >
            Se créer un compte
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginDisplay;
