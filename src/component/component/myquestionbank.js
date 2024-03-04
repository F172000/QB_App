import React, { useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./navbar";
import Mainnavbar from "./navbarmain";
import footor from "./images/footor.png";

const columns = [
  {
    id: "checkbox",
    minWidth: 100,
    align: "center",
    format: (value) => <Checkbox color="primary" />,
  },
  { id: "questionBankName", label: "Question Bank Name", minWidth: 800 },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    align: "center",
    format: (value, index) => (
      <div>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              width: "78px",
              height: "26px",
              marginLeft: "15px",
              borderRadius: "4px",
              backgroundColor: "#FCC822",
              color: "#000",
            }}
            onClick={() => handleEdit(index)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{
              marginLeft: "10px",
              width: "89px",
              height: "26px",
              borderRadius: "4px",
              backgroundColor: "#FF000F",
              color: "#000",
            }}
            onClick={() => handleDelete(index)}
          >
            Delete
          </Button>
        </Stack>
      </div>
    ),
  },
];

const rows = [
  { questionBankName: "KnowledgeQuest", action: "2" },
  { questionBankName: "QuizMasterPro", action: "2" },
  { questionBankName: "BrainTeasureHub", action: "2" },
  { questionBankName: "LearnAndTestHub", action: "2" },
  { questionBankName: "TrivalTreasury", action: "2" },
  { questionBankName: "InsightFullQuizzes", action: "2" },
  { questionBankName: "WisdomChallenge", action: "2" },
  { questionBankName: "SmartQuizVault", action: "2" },
];

const handleEdit = (id) => {
  //  console.log(Editing row with id ${id});
};

const handleDelete = (index) => {
  // console.log(Deleting row with index ${index});
};

export default function Questionbank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = () => {
    const filteredRows = rows.filter((row) =>
      row.questionBankName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Filtered Rows:", filteredRows);
  };

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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: 700,
                        fontSize: "14px",
                        paddingBottom: "13px",
                        paddingRight: "0px",
                        paddingTop: "13px",
                        letterSpacing: "-0.6%",
                        paddingLeft: "0px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          fontWeight: 400,
                          fontSize: "14px",
                          letterSpacing: "-0.6%",
                          padding: "1px",
                          height: "30px",
                        }}
                      >
                        {column.format
                          ? column.format(row[column.id])
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div>
        <img
          style={{
            marginTop: "50px",
            marginBottom: "25px",
            maxWidth: "100%",
            height: "auto",
          }}
          src={footor}
          alt="Footer"
        />
      </div>
    </div>
  );
}
