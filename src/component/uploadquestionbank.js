import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import { storage } from "../config/firebase";
import {
  Button,
  useMediaQuery,
  createTheme,
  Box,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import upload from "../assets/images/upload (1) 1.png";
import Mainnavbar from "./navbarmain";
import {toast} from 'react-toastify';
// import XLSX from "xlsx";
import * as XLSX from 'xlsx';
import Footer from "./footer";
import { db } from "../config/firebase";
import { read, utils } from "xlsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#a2c1e0",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const theme = createTheme();

export default function Uploadquebank() {
  const {user}=useSelector((state)=>state.auth);
  console.log(user,"USer>>>>>>>");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadLoader,setUploadLoader]=useState(false);
  const fileInputRef = useRef(null);
  const [selectedfile,setselectedfile]=useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();
  };
  const handleSave = async () => {
    setUploadLoader(true);
    if (!selectedfile) {
      alert('Please select a file first.');
      setUploadLoader(false);
      return;
    }
  
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const fileNameWithoutExtension = selectedfile.name.replace(/\.[^/.]+$/, "");
      const questionBankName = fileNameWithoutExtension;
      console.log(questionBankName,"questionBankName");
      const questionBankCollection = collection(db, 'questionBanks');
      const questions = [];
  
      sheetData.forEach(row => {
        const { 'Question ID': questionId, 'Question Text': questionText, 
                'Option A': optionA, 'Option B': optionB, 'Option C': optionC,
                'Option D': optionD, 'Correct Answer(s)': correctAnswer,
                'Difficulty Level': difficultyLevel, 'Category': category,
                'Explanation': explanation } = row;

                if (Object.values(row).some(value => value === undefined || value === null)) {
                  setUploadLoader(false);
                  toast.error('One or more fields in the Excel data are empty or undefined.')
                  return;
                }
  
        const questionData = {
          questionId: questionId,
          questionText: questionText,
          options: [optionA, optionB, optionC, optionD],
          correctAnswer: correctAnswer,
          difficultyLevel: difficultyLevel,
          category: category,
          explanation: explanation
        };
  
        questions.push(questionData);
      });
      if (questions.length === 0) {
        setUploadLoader(false);
        toast.error('No valid data found in the Excel file.')
        return;
      }
     console.log(questions,"questionData>>>>>>>");
     const name=user?.name;
     const id=user?.id;
      await addDoc(questionBankCollection, { name:questionBankName,questions: questions,username:name,userID:id }).then(()=>{
        toast.success('Data Uploaded Successfully.');
        handleClose();
        setUploadLoader(false);
        setselectedfile(null);
      }).catch((error)=>{
      toast.error(error.message);
      setUploadLoader(false);
      setselectedfile(null);
      })
    };
  
    fileReader.readAsArrayBuffer(selectedfile);
  };  
  const handleFileChange = async (e) => {
    setselectedfile(e.target.files[0]);
  };
  return (
    <div style={{ overflow: "hidden", marginTop: "100px" }}>
      <Mainnavbar></Mainnavbar>
      <div className="row p-4">
        <div className="col-md-8 col-sm-8">
          <h2
            style={{
              //    backgroundColor: " #fcc822",
              color: " #333333",
              borderRadius: "13px",
              font: "Poppins",
              padding: isSmallScreen ? 3 : "15px",
              lineHeight: isSmallScreen ? 1.4 : 1.5,
              fontWeight: 600,
              fontSize: isSmallScreen ? "1.7rem" : "2.8rem", // Relative font size
              textAlign: "left",
              marginLeft: isSmallScreen ? 0 : 20,
            }}
          >
            Upload a Question Bank
          </h2>
          <Divider
            sx={{
              width: "135px",
              height: "6px",
              border: "solid 2px #FCC832",
              color: "#FCC832",
              backgroundColor: "#FCC832",
              textAlign: "left", // Adjust as needed
              marginLeft: isSmallScreen ? 0 : "30px", // Adjust as needed
            }}
          />
          <div
            style={{
              marginTop: isSmallScreen ? "2.5rem" : "4.5rem",
              marginLeft: isSmallScreen ? "0rem" : "1.5rem", // Relative padding
              color: " #333333",
              //        borderRadius: "13px",
              font: "Poppins",
              padding: "15px",
              lineHeight: "27.5px",
              fontWeight: 400,
              //  fontSize: isSmallScreen ? "1.2rem" : "1.3rem", // Relative font size
            }}
          >
            <Typography
              style={{
                marginBottom: "30px",
                fontSize: isSmallScreen ? "1.2rem" : "1.3rem",
              }}
            >
              1. Before uploading, please ensure your .xls file follows our
              formatting guidelines. You can find detailed instructions here on
              how to structure your files.
            </Typography>
            <Typography
              style={{
                marginBottom: "30px",
                fontSize: isSmallScreen ? "1.2rem" : "1.3rem",
              }}
            >
              2. Name your Question Bank: Please use the following naming
              convention as this will help organize your question banks
              efficiently. Example: "Biology_Quiz_Questions_Jan2023"
            </Typography>
            <Typography
              style={{ fontSize: isSmallScreen ? "1.2rem" : "1.3rem" }}
            >
              3. Upload your file, and you're all set! Your questions will be
              integrated into the database, ready for users to access.
            </Typography>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 mt-4">
          <Button
            style={{
              backgroundColor: " #fcc822",
              color: " #2E3899",
              borderRadius: "13px",
              font: "Poppins",
              // padding: "15px",
              lineHeight: "52.5px",
              fontWeight: 700,
              fontSize: "13.93px",
              width: "224px",
              height: "48px",
              float: "left",

              // paddingLeft: isSmallScreen ? "60px" : "80px",
              marginLeft: isSmallScreen ? "80px" : "80px",
              padding: isSmallScreen ? "1rem" : "1.5rem", // Relative padding
            }}
            href="/Questionbank"
          >
            MY QUESTION BANK
            <VisuallyHiddenInput type="file" />
          </Button>
          <div
            className="row"
            style={{
              marginTop: "100px",
              //  borderRadius: "100px",
              //marginBottom: 10,
              //float: "center",
              marginLeft: isSmallScreen ? "70px" : "40px",
            }}
          >
            <div className="col-md-12">
              <label htmlFor="fileInput">
                <a onClick={handleOpen}>
                  <img src={upload} width="220px" height="220px" />
                </a>
              </label>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography variant="h5" component="h2" gutterBottom>
                   Upload Question Bank
                  </Typography>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xls, .xlsx"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Button onClick={handleFileUpload}>Choose .xlx  or .csv file</Button>
                  <span style={{color:"blue"}}>{selectedfile?.name}</span>
                  <VisuallyHiddenInput
                    ref={fileInputRef}
                    type="file"
                    accept=".xls, .xlsx, .csv"
                    onChange={handleFileChange}
                  />
                  <hr/>
                  <Button    style={{
                  backgroundColor: "#FCC822",
                  // boxShadow:
                  //   " 0px 10.450244903564453px 23.22276496887207px -6.966829299926758px #FBE18F",
                  fontSize: "13px",
                  lineHeight: "14px",
                  // width: "71px",
                  height: "37px",
                  fontWeight: 400,
                  font: "Poppins",
                  color: "black",
                  // marginRight: "10px",
                }} onClick={handleSave}>{uploadLoader? <Spinner size="sm"/>:"Click here to upload"}</Button>
                </Box>
                {/* <Button>Save</Button> */}
              </Modal>
            </div>
            <div className="row">
              <span
                style={{
                  font: "Poppins",
                  fontWeight: 400,
                  fontSize: "20px",
                  marginLeft: isSmallScreen ? "2.0rem" : "2.5rem",
                }}
                type="file"
              >
                Upload .xlx file
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
