import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Paper,
  Typography,
  Table,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  TextField,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import {toast} from 'react-toastify';
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./navbar";
import Mainnavbar from "./navbarmain";
import footor from "../assets/images/footor.png";

import Footer from "./footer";
import { useDispatch,useSelector } from "react-redux";
import { getQuestionBanksById,getUserQuestionBanksBySearchTerm} from "../redux/questionBankThunk";


export default function Questionbank() {
  const dispatch=useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const {user}=useSelector((state)=>state.auth);
  console.log(user,"user");
  const {userBanks}=useSelector((state)=>state.questionBanks);
  const [selected,setselected]=useState('');
  console.log(userBanks,"Bank");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(()=>{
dispatch(getQuestionBanksById(user?.id));
  },[]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    if(searchTerm===''){
      dispatch(getQuestionBanksById(user?.id));
    }
    else{
    dispatch(getUserQuestionBanksBySearchTerm({ id: user?.id, searchTerm: searchTerm }));
    }
  };
  const debouncedSearch = debounce(handleSearch, 300);
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value,"handlechange>>>>>>>");
    setSearchTerm(value);
    debouncedSearch(value);// Trigger debounced search
  };
   const handleDelete=async(id)=>{
    const DocRef = doc(db, "questionBanks", id);
    await deleteDoc(DocRef).then(()=>{
    toast.success("Question Bank Deleted Successfully");
    dispatch(getQuestionBanksById(user?.id));
    }).catch((error)=>{
     console.log(error.message);
    })
   }
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ overflow: "hidden", marginTop: "50px" }}>
      <Mainnavbar />
      <div
        style={{
          width: "100%",
          marginRight: "80px",
          padding: isSmallScreen ? 10 : 50,
        }}
      >
        <Typography
          style={{
            marginLeft: isSmallScreen ? 20 : 50,
            marginTop: "80px",
            fontWeight: 600,
            fontSize: "35px",
            fontSize: isSmallScreen ? "1.7rem" : "2rem", // Relative font size
          }}
        >
          My Question Bank
        </Typography>
        <Paper
          style={{
            marginTop: "80px",
            margin: isSmallScreen ? 20 : 50,
            background:
              "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #E5E9EB, #E5E9EB)",
            border: "1px solid #E5E9EB",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "14px",
                marginLeft: isSmallScreen ? 0 : 40,
              }}
            >
              My Question Bank
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isSearchVisible && (
                <Box>
                  <TextField
                    size="small"
                    fullWidth
                    style={{ color: "black", marginTop: "10px" }}
                    placeholder="Search..."
                  value={searchTerm}
                  onChange={(e)=>handleChange(e)}
                    onBlur={() => setIsSearchVisible(false)}
                    autoFocus
                  />
                </Box>
              )}
              <IconButton onClick={() => setIsSearchVisible(!isSearchVisible)}>
                <SearchIcon style={{ color: "black" }} />
              </IconButton>
            </div>
          </div>
          <Divider color="#E0E0E0" />
          <TableContainer component={Paper} style={{padding:'0px 3rem'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {/* <TableCell padding="checkbox">
                     </TableCell> */}
            <TableCell style={{ fontWeight: 'bold' }}>Question Bank Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right" >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userBanks?.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selected}
                        inputProps={{
                          'aria-labelledby': row?.id,
                        }}
                      /></TableCell> */}
              <TableCell  component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell align="right"><Button variant="contained" color="error" onClick={()=>handleDelete(row?.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Paper>
      </div>
      <div>
        <Footer />{" "}
      </div>
    </div>
  );
}
