
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Mainnavbar from "../component/navbarmain";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../component/footer";
const Admin = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <> 
        {user && props.children}
    </>
  );
};

export default Admin;
