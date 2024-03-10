import {
  Avatar,
  Button,
  Card,
  FormControl,
  FormGroup,
  FormLabel,
  Select,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Mainnavbar from "./navbarmain";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import profile from '../assets/images/profile.jpg'
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import Footer from "./footer";
import { db } from "../config/firebase";
export default function Profile() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profileURL, setprofileURL] = useState(null);
  const [image,setimage]=useState(null);
  console.log(image,"image");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Assuming there's only one document per UID
          const userData = querySnapshot.docs[0].data();
          setname(userData.name);
          setphone(userData.phone);
          setemail(userData.email);
          setpassword(userData.password);
          setprofileURL(userData.profileURL);
          // return userData;
        } else {
          console.log("No matching documents");
          return null;
        }
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div style={{ marginTop: "100px" }}>
      <Mainnavbar />
      {/* <Card style={{ padding: 50 }}>
          <h6>General Setting </h6>
        </Card> */}
      <Card
        style={{
          padding: isSmallScreen ? 20 : 80, // Adjust padding based on screen size
          backgroundColor: "#A2C1E0",
          boxShadow: "0px 0px 0px 0px",
          "@media (max-width: 768px)": {
            padding: isSmallScreen ? 50 : 80, // Adjust padding for smaller screens
          },
        }}
      >
        {" "}
        <Typography
          style={{
            font: "Poppins",
            fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size

            fontWeight: 600,
            lineHeight: "67.5px",
            letterSpacing: "0em",
            textAlign: "left",
            marginBottom: isSmallScreen ? "1rem" : "3.125rem",
            color: " #333333",
          }}
        >
          My Profile
        </Typography>
        <Card
          style={{
            padding: isSmallScreen ? "1.7rem" : "3.125rem",
            backgroundColor: "#D4ECFF",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              padding: isSmallScreen ? "0rem" : "1.25rem",
            }}
          >
            <img
              src={profileURL || profile}
              width="100rem"
              height={"100rem"}
              style={{
                borderRadius: "100px",
                marginBottom: 10,
                float: "center",
                marginRight: isSmallScreen ? 0 : 50,
              }}
              // onChange={(e) => setprofileURL(e.target.files[0])}
            ></img>

            <Button
              className="d-flex justify-content-start"
              variant="contained"
              style={{
                backgroundColor: " #fcc822",
                color: "black",
                textAlign: "center",
                borderRadius: "100px",
                font: "Outfit",
                fontWeight: 500,
                fontSize: "10px",
                marginLeft: isSmallScreen ? "10px" : "30px",
                padding: "5px,16px,5px,16px",
                width: "120px",
                height: "23px",
                marginRight: "0px",
              }}
              component="label"
              onClick={(e)=>setimage(e.target.files)}
            >
              Upload Photo
              <input hidden accept="image/*" multiple type="file"  />
            </Button>
          </div>

          <div className="row">
            <Card
              style={{
                padding: isSmallScreen ? "1.7rem" : "3.125rem",
                backgroundColor: "#D4ECFF",
                borderRadius: "10px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                }}
              >
                {/* <thead>
                  <tr>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        borderBottom: "1px solid #00000026",
                      }}
                    >
                      Field
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        borderBottom: "1px solid #00000026",
                      }}
                    >
                      Value
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        borderBottom: "1px solid #00000026",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        // fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      Name
                    </th>

                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //  borderBottom: "1px solid #00000026",
                      }}
                      rowSpan="2"
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: " #fcc822",
                          color: "black",
                          textAlign: "center",
                          borderRadius: "72.66px",
                          font: "Outfit",
                          fontWeight: 500,
                          fontSize: "7.27px",
                          float: "right",
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //  borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      hsjsh
                      {name}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        // borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        //  fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      Phone Number
                    </th>

                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        // borderBottom: "1px solid #00000026",
                      }}
                      rowSpan={2}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: " #fcc822",
                          color: "black",
                          textAlign: "center",
                          borderRadius: "72.66px",
                          font: "Outfit",
                          fontWeight: 500,
                          fontSize: "7.27px",
                          float: "right",
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        // borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      {phone}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //  borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        //fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      Email
                    </th>
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        // borderBottom: "1px solid #00000026",
                      }}
                      rowSpan={2}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: " #fcc822",
                          color: "black",
                          textAlign: "center",
                          borderRadius: "72.66px",
                          font: "Outfit",
                          fontWeight: 500,
                          fontSize: "7.27px",
                          float: "right",
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //  borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      hsuhsiusiu
                      {email}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        // borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        //fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      Password
                    </th>
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //  borderBottom: "1px solid #00000026",
                      }}
                      rowSpan={2}
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: " #fcc822",
                          color: "black",
                          textAlign: "center",
                          borderRadius: "72.66px",
                          font: "Outfit",
                          fontWeight: 500,
                          fontSize: "7.27px",
                          float: "right",
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <td
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        //borderBottom: "1px solid #00000026",
                        font: "Outfit",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0em",
                      }}
                    >
                      09999
                      {password}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </Card>
      </Card>
      <div>
        <Footer />
      </div>
    </div>
  );
}
