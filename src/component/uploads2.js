import React from "react";
import footor from "./images/footor.png";
import { useState } from "react";
import {
  Button,
  Box,
  Checkbox,
  Link,
  Stack,
  CardActionArea,
  Chip,
  Container,
  Typography,
  TextField,
  FormControl,
  useMediaQuery,
  createTheme,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import image from "./images/image.png";
import logo from "./images/logo.png";
import Navbar from "./navbar";
import credit from "./images/credit.png";
import Footer from "./footer";
import footer from "./images/footer.png";
import visa from "./images/visa.png";
import pay from "./images/mobile-payment 1.png";
import Mainnavbar from "./navbarmain";

const theme = createTheme();
export default function Uploads2() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleSaveCardChange = (event) => {
    setSaveCard(event.target.value === "yes");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission
  };

  return (
    <div>
      <div style={{ overflow: "hidden", marginTop: "100px" }}>
        <Mainnavbar />

        <div
          className="row"
          style={{
            marginLeft: isSmallScreen ? "20px" : "50px",
            marginRight: isSmallScreen ? "20px" : "50px",
            marginTop: isSmallScreen ? "5px" : "20px",
          }}
        >
          <div
            className="col-md-6 col-sm-6"
            style={{
              paddingBottom: isSmallScreen ? "0.1rem" : "1.875rem",
              marginTop: "50px",
            }}
          >
            <img
              src={pay}
              style={{
                width: isSmallScreen ? " 6.5rem" : "9.375rem",
                height: isSmallScreen ? " 7.0rem" : "10rem",
              }}
            ></img>
            <p
              style={{
                color: " #333333",
                font: "Poppins",
                padding: "1px",
                lineHeight: isSmallScreen ? "2.5rem" : "3.15rem",
                fontWeight: 700,
                fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size
              }}
            >
              Please make a small contribution to hosting costs for this site.
            </p>
            <p
              style={{
                //marginLeft: "20px",
                color: " #333333",
                //        borderRadius: "13px",
                font: "Poppins",
                // padding: "15px",
                lineHeight: "27.5px",
                fontWeight: 400,
                fontSize: isSmallScreen ? "1.0rem" : "1.25rem", // Relative font size
              }}
            >
              Thank you for choosing to upload a Question Bank! Before
              proceeding, a small fee is required to cover the processing and
              integration of your questions.
            </p>
          </div>
          <div className="col-md-6 col-sm-6  d-flex justify-content-center">
            <Card
              style={{
                // width: "500px",
                // height: "640px",
                // padding: 40,
                padding: isSmallScreen ? "1rem" : "2.25rem",
                marginTop: isSmallScreen ? "2.5rem" : "4.5rem",
                backgroundColor: "#D4ECFF",
                borderRadius: "20px",
                marginRight: isSmallScreen ? "0rem" : "1.25rem",
                //marginBottom: "80px",
              }}
            >
              <p
                style={{
                  color: " #282828",
                  font: "Poppins",
                  padding: "1px",
                  //lineHeight: isSmallScreen ? "2.5rem" : "3.15rem",
                  fontWeight: 700,
                  textAlign: "center",

                  fontSize: isSmallScreen ? "1.7rem" : "3rem", // Relative font size
                  marginTop: "20px",
                }}
              >
                $210.00
              </p>
              <Stack direction="row" spacing={9} style={{ marginTop: "50px" }}>
                <img
                  src={credit}
                  style={{
                    marginRight: isSmallScreen ? " 0rem" : "9.0rem",
                    width: isSmallScreen ? " 7rem" : "10rem",
                    height: isSmallScreen ? " 0.8rem" : "1.25rem",
                  }}
                ></img>
                <img
                  src={visa}
                  style={{
                    width: isSmallScreen ? " 6.5rem" : "8.75rem",
                    height: isSmallScreen ? " 1.0rem" : "1.25rem",
                  }}
                ></img>
              </Stack>
              <Chip
                label="Pay securely with your Bank Account using Visa or Mastercard"
                component="c"
                href="#"
                clickable
                style={{
                  //marginLeft: "20px",
                  color: " #383838",
                  //        borderRadius: "13px",
                  marginTop: "20px",
                  font: "Poppins",
                  backgroundColor: "#f3f3f3",
                  padding: "23px",
                  width: "500px",
                  height: "80px",
                  lineHeight: "20.5px",
                  fontWeight: 400,
                  fontSize: isSmallScreen ? "0.7rem" : "1rem", // Relative font size
                  height: "50px",
                }}
              />

              <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Label"
                    InputProps={{
                      style: {
                        borderRadius: "16px",
                        fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust the font size for smaller screens
                      },
                    }}
                    required
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Name on Card"
                    size="medium"
                    InputProps={{
                      style: {
                        borderRadius: "16px",
                        fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust the font size for smaller screens
                      },
                    }}
                    required
                  />
                </FormControl>
                <FormControl
                  className="d-flex justify-content-center"
                  sx={{ marginTop: 1 }}
                >
                  <Stack spacing={4} direction="row">
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      InputProps={{
                        style: {
                          borderRadius: "16px",
                          fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust the font size for smaller screens
                        },
                      }}
                      required
                    />
                    <TextField
                      fullWidth
                      type="text"
                      variant="outlined"
                      label="CVV Code"
                      InputProps={{
                        style: {
                          borderRadius: "16px",
                          fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust the font size for smaller screens
                        },
                      }}
                      required
                    />
                  </Stack>
                </FormControl>
                <Link
                  style={{
                    // marginRight: "180px",
                    color: "#000000",
                    textDecoration: "none",
                    fontSize: isSmallScreen ? "0.7rem" : "1rem", // Relative font size
                  }}
                >
                  <Checkbox /> Save card for future payments
                </Link>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!cardName || !cardNumber || !expiryDate || !cvv}
                >
                  PROCEED
                </Button> */}
                <div
                  className="d-flex justify-content-center"
                  style={{
                    marginBottom: "50px",
                  }}
                >
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: " #fcc822",
                      color: "black",
                      borderRadius: "20px",
                      font: "Poppins",
                      padding: "15px",
                      //float: "center",
                      lineHeight: "20px",
                      fontWeight: 700,
                      fontSize: "14px",
                      width: "225px",
                      height: "40px",
                      marginTop: "30px",
                      textAlign: "center",
                      //marginRight: "30px",
                    }}
                    href="/Payments1"
                  >
                    PROCEED
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <Footer />{" "}
      </div>
    </div>
  );
}
