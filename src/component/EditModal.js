import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 20,
  p: 4,
};

export default function EditModal({
  open,
  handleClose,
  editName,
  editPhone,
  editEmail, onNameEdit, onPhoneEdit, onEmailEdit
}) {
    console.log( editName,
        editPhone,
        editEmail,"data");
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [name,setName]=useState(editName);
  const [phone,setPhone]=useState(editPhone);
  const [email,setEmail]=useState(editEmail);
  const handleEditName = async () => {
    setLoader(true);
    const userDocRef = doc(db, "users", user?.id);
    await updateDoc(userDocRef, {
      name: name,
    })
      .then(() => {
        toast.success("Updated Name Successfully");
        setLoader(false);
        onNameEdit(name);
        handleClose();
      })
      .catch(() => {
        toast.error("Failed to update name");
        setLoader(false);
        handleClose();
      });
  };
  const handleEditPhone = async () => {
    setLoader(true);
    const userDocRef = doc(db, "users", user?.id);
    await updateDoc(userDocRef, {
      phone: phone,
    })
      .then(() => {
        toast.success("Updated Phone Number Successfully");
        setLoader(false);
        onPhoneEdit(phone);
        handleClose();
      })
      .catch(() => {
        toast.error("Failed to update phone number");
        setLoader(false);
        handleClose();
      });
  };
  const handleEditEmail = async () => {
    setLoader(true);
    const userDocRef = doc(db, "users", user?.id);
    await updateDoc(userDocRef, {
      email: email,
    })
      .then(() => {
        toast.success("Updated Email Successfully");
        setLoader(false);
        onEmailEdit(email);
        handleClose();
      })
      .catch(() => {
        toast.error("Failed to update email");
        setLoader(false);
        handleClose();
      });
  };
  return (
    <>
      {editName && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="justify-content-center align-items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Name
            </Typography>
            {/* <div > */}
            <TextField fullWidth size="small" value={name} onChange={(e)=>setName(e.target.value)} />
            <Button
              variant="contained"
              className="mt-2"
              style={{
                backgroundColor: " #fcc822",
                color: " #1c1c1c",
                borderRadius: "13px",
                font: "Poppins",
              }}
              onClick={handleEditName}
            >
              {loader ? <Spinner /> : "save"}
            </Button>
            {/* </div> */}
          </Box>
        </Modal>
      )}
      {editPhone && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="justify-content-center align-items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Phone#
            </Typography>
            {/* <div > */}
            <TextField fullWidth size="small" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <Button
              variant="contained"
              className="mt-2"
              style={{
                backgroundColor: " #fcc822",
                color: " #1c1c1c",
                borderRadius: "13px",
                font: "Poppins",
              }}
              onClick={handleEditPhone}
            >
              {loader ? <Spinner /> : "save"}
            </Button>
            {/* </div> */}
          </Box>
        </Modal>
      )}
      {editEmail && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="justify-content-center align-items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Email
            </Typography>
            {/* <div > */}
            <TextField fullWidth size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Button
              variant="contained"
              className="mt-2"
              style={{
                backgroundColor: " #fcc822",
                color: " #1c1c1c",
                borderRadius: "13px",
                font: "Poppins",
              }}
              onClick={handleEditEmail}
            >
              {loader ? <Spinner /> : "save"}
            </Button>
            {/* </div> */}
          </Box>
        </Modal>
      )}
    </>
  );
}
