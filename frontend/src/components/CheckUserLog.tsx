import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Proptype {
  page: string;
}

const CheckUserLog: React.FC<Proptype> = ({ page }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let cookieStatus = document.cookie.replace(
      /(?:(?:^|.*;\s*)status\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (
      cookieToken &&
      cookieStatus &&
      cookieToken.length > 0 &&
      cookieStatus.length > 0
    ) {
      dispatch({
        type: "auth/storeToken",
        payload: {
          token: cookieToken,
          status: cookieStatus,
        },
      });
      if (page === "home") {
        navigate("/home");
      } else if (page === "profil") {
        navigate("/profil");
      } else if (page === "login") {
        navigate("/profil");
      }
    } else {
      dispatch({
        type: "Auth/storeToken",
        payload: {
          token: "",
          status: "",
        },
      });
      if (page === "home") {
        navigate("/home");
      } else if (page === "profil") {
        navigate("/login");
      } else if (page === "login") {
        navigate("/login");
      }
    }
  }, [dispatch, navigate, page]);
  return null;
};

export default CheckUserLog;
