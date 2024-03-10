import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import header from "../assets/images/header.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, createTheme } from "@mui/material";
import { SignOutUser } from "../redux/AuthThunk";
import { useSelector,useDispatch } from "react-redux";
const theme = createTheme();

export default function Mainnavbar() {
  const {user}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const [activeLink, setActiveLink] = useState("/");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleclose=(e)=>{
    e.preventDefault();
    dispatch(SignOutUser());
    setIsMenuOpen(false);
  }
  // ...

  const renderMobileMenu = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <MenuIcon
        fontSize="large"
        style={{ cursor: "pointer", color: "#ffff" }}
        onClick={toggleMenu}
      />
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: 0,
            //width: "100%",
            backgroundColor: "#a2c1e0",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              padding: "10px 10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavLink
              style={{ marginBottom: "10px" }}
              to="/"
              text="Home"
              activeLink={activeLink}
              onClick={closeMenu}
            />
            <NavLink
              style={{ marginBottom: "10px" }}
              to="/test-knowledge"
              text="Test My Knowledge"
              activeLink={activeLink}
              onClick={closeMenu}
            />
            <NavLink
              style={{ marginBottom: "20px" }}
              to="/uploadquebank"
              text="Upload a Question Bank"
              activeLink={activeLink}
              onClick={closeMenu}
            />
            <NavLink
              style={{ marginBottom: "10px" }}
              to="/profile"
              text="Profile"
              activeLink={activeLink}
              onClick={closeMenu}
            />
              <NavLink
              style={{ marginBottom: "10px" }}
              text="Logout"
              activeLink={activeLink}
              onClick={handleclose}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderDesktopMenu = () => (
    <div className="links" style={{ display: "flex" }}>
      <NavLink to="/" text="Home" activeLink={activeLink} />
      <NavLink
        to="/test-knowledge"
        text="Test My Knowledge"
        activeLink={activeLink}
      />
      <NavLink
        to="/uploadquebank"
        text="Upload a Question Bank"
        activeLink={activeLink}
      />
      <NavLink to="/profile" text="Profile" activeLink={activeLink} />
      <NavLink
      onClick={handleclose}
        to={'/login'}
        text="Logout"
        activeLink={activeLink}
      />
    </div>
  );

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#a2c1e0",
      }}
    >
      <div
        className="nav-inner"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 5px",
        }}
      >
        <span className="logo">
          <img
            src={header}
            alt="header"
            style={{
              maxWidth: isSmallScreen ? "75%" : "100%",
              height: "auto",
              marginTop: "5px",
            }}
          />
        </span>

        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>
    </nav>
  );
}

const NavLink = ({ to, text, activeLink, onClick }) => (
  <Link
    to={to}
    style={{
      textDecoration: "none",
      color: to === activeLink ? "#fcc822" : "#808080",
      margin: "0 10px",
    }}
    onClick={onClick}
  >
    {text}
  </Link>
);
