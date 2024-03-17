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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Mainnavbar from "./navbarmain";
import profile from "../assets/images/profile.jpg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Footer from "./footer";
import { storage, db } from "../config/firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import EditModal from "./EditModal";
export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  console.log(user, "user");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const handleName = (name) => {
    setEditName(name);
    setOpen(true);
  };
  const handlePhone = (phone) => {
    setEditPhone(phone);
    setOpen(true);
  };
  const handleEmail = (email) => {
    setEditEmail(email);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadImgLoader, setuploadImgLoader] = useState(false);
  const handleNameEdit = (newName) => {
    setname(newName);
  };

  const handlePhoneEdit = (newPhone) => {
    setphone(newPhone);
  };

  const handleEmailEdit = (newEmail) => {
    setemail(newEmail);
  };

  const handleImageUpload = async (e) => {
    setuploadImgLoader(true);
    const file = e.target.files[0];
    const imageRef = ref(storage, file.name);
    console.log(imageRef, "imageRef");
    try {
      const snapshot = await uploadBytes(imageRef, file);
      console.log(snapshot, "snapshot");
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL, "downloadUrl");
      const userDocRef = doc(db, "users", user?.id);
      await setDoc(userDocRef, { image: downloadURL }, { merge: true });
      toast.success("Image is Changed successfully");
      setImageUrl(downloadURL);
      setuploadImgLoader(false); // Set the image URL in state
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
      setuploadImgLoader(false);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user?.id);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log("User data:", userData);
          setname(userData.name);
          setphone(userData.phone);
          setemail(userData.email);
          setImageUrl(userData.image);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div style={{ marginTop: "1rem" }}>
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
            {uploadImgLoader ? (
              <Spinner />
            ) : (
              <img
                src={imageUrl || user?.image || profile}
                width="100rem"
                height="100rem"
                style={{
                  borderRadius: "100px",
                  marginBottom: 10,
                  float: "center",
                  marginRight: isSmallScreen ? 0 : 50,
                }}
              ></img>
            )}

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
            >
              Upload Photo
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
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
                        onClick={() => handleName(user?.name)}
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
                        onClick={() => handlePhone(user?.phone)}
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
                        onClick={() => handleEmail(user?.email)}
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
                      {email}
                    </td>
                  </tr>
                </tbody>
              </table>
              <EditModal
                open={open}
                handleClose={handleClose}
                editName={editName}
                editPhone={editPhone}
                editEmail={editEmail}
                onNameEdit={handleNameEdit}
                onPhoneEdit={handlePhoneEdit}
                onEmailEdit={handleEmailEdit}
              />
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
