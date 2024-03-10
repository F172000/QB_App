
import React from "react";
import { useSelector } from "react-redux";
import Mainnavbar from "../component/navbarmain";
import { useNavigate } from "react-router-dom";
import Footer from "../component/footer";
const Admin = (props) => {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  // if (!user) {
  //   navigate("/");
  // }
  return (
    <>
        {props.children}
    </>
  );
};

export default Admin;
