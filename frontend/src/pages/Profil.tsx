import React from "react";
import { useSelector } from "react-redux";
import CheckUserLog from "../components/CheckUserLog";
import { RootState } from "../utils/store";

const Profil = () => {
  const { status, token } = useSelector((state: RootState) => state.Auth);
  return (
    <>
      <CheckUserLog page={'profil'} />
      {(status.length > 0 && token.length > 0 && <div>log</div>) ||
        (status.length === 0 && token.length === 0 && <div>no log</div>)}
    </>
  );
};

export default Profil;
