import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EmailValidation = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const emailValidation = async () => {
      const response = await fetch("http://localhost:8080/user/validation-email", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: token})
      });
      const json = await response.json();
      dispatch({
        type: "FlashMessage/edit",
        payload: {message: json.message}
      })
       navigate('/login')
    };
    if (token && token?.length > 0) emailValidation();
  });
  return null;
};

export default EmailValidation;
