import React, { useState } from "react";
import header from "./images/header.png";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const theme = createTheme();

export default function Navbar() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#a2c1e0",
          boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            padding: "0px 5px",
            justifyContent: "space-between",
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
          {isSmallScreen ? (
            // For Mobile
            <div>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
              >
                <MenuItem onClick={handleMobileMenuClose}>
                  <a
                    href="/Login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    LOG IN
                  </a>
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose}>
                  <a
                    href="/Signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    SIGN UP
                  </a>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            // For Desktop
            <div className="links">
              <a href="/Login">
                <Button
                  href="/Login"
                  style={{
                    color: "black",
                    marginRight: "10px",
                  }}
                >
                  LOG IN
                </Button>
              </a>
              <a href="/Signup">
                <Button
                  href="/Signup"
                  style={{ backgroundColor: "#FCC822", color: "black" }}
                >
                  SIGN UP
                </Button>
              </a>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
