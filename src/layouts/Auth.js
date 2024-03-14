import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const { user } = useSelector((state) => state.auth);
  const navigate=useNavigate();

  // if (user) {
  //   navigate("/");
  // }
  return (
    <>
      <div>
      {props.children}
      </div>
    </>
  );
};

export default Auth;
