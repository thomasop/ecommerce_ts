import React from "react";
import CheckUserLog from "../components/CheckUserLog";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

const Home = () => {
  const { status, token } = useSelector((state: RootState) => state.Auth);
  return (
    <>
      <CheckUserLog page={'home'} />
      {(status.length > 0 && token.length > 0 && <div>log</div>) ||
        (status.length === 0 && token.length === 0 && <div>no log</div>)}
    </>
  );
};

export default Home;
