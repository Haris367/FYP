import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Box,
} from "@mui/material";
// import Title from "../styles/Title";
import "./pages.styles.css";
// import Navbar from "./Navbar";

// Generate Order Data
function createData(id, orderId, date, name, modelNum, modelName, status) {
  return { id, orderId, date, name, modelNum, modelName, status };
}

const rows = [
  createData(
    0,
    5,
    "10 Nov, 2024",
    "Elvis Presley",
    "MNCN2J/A",
    "Iphone X",
    "Pending"
  ),
  createData(
    1,
    10,
    "16 Nov, 2024",
    "Paul McCartney",
    "MNCN2J/A",
    "Iphone 8",
    "Pending"
  ),
  createData(
    2,
    20,
    "16 Nov, 2024",
    "Tom Scholz",
    "MNCN2J/A",
    "Iphone X",
    "Pending"
  ),
  createData(
    3,
    30,
    "20 Nov, 2024",
    "Bruce Springsteen",
    "MNCN2J/A",
    "Iphone 7",
    "Done"
  ),
  createData(
    4,
    40,
    "25 Nov, 2024",
    "Bruce Springsteen",
    "MNCN2J/A",
    "Iphone 7",
    "Done"
  ),
  createData(
    5,
    50,
    "25 Nov, 2024",
    "Bruce Springsteen",
    "MNCN2J/A",
    "Iphone 7",
    "Done"
  ),
  createData(
    6,
    60,
    "25 Nov, 2024",
    "Bruce Springsteen",
    "MNCN2J/A",
    "Iphone 7",
    "Done"
  ),
];

// function preventDefault(event) {
//   event.preventDefault();
// }
const tableStyles = {
  textAlign: "center",
};
export const totalCount = rows.length;
export default function Inspection({ showAll = true }) {
  // if showAll false , then display 4 rows else display all
  const allRows = showAll ? rows : rows.slice(0, 4); // can be better
  return (
    <>
      <Box className="pageStyling" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeaderCell" style={tableStyles}>Inspection Id</TableCell>
              <TableCell className="tableHeaderCell" style={tableStyles}>Ad Id</TableCell>
              <TableCell className="tableHeaderCell" style={tableStyles}>Date</TableCell>
              <TableCell className="tableHeaderCell" style={tableStyles}>Inspector Name</TableCell>
              <TableCell className="tableHeaderCell" style={tableStyles}>IMEI</TableCell>
              <TableCell className="tableHeaderCell" style={tableStyles}>Model Name</TableCell>
              <TableCell className="tableHeaderCell" style={tableStyles}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRows.map((row) => (
              <TableRow key={row.id} className="rowHighlight">
                <TableCell style={{ border: "2px solid rgb(170 209 187)", ...tableStyles }}>{row.id}</TableCell>
                <TableCell style={{ border: "2px solid rgb(170 209 187)", ...tableStyles }}>{row.orderId}</TableCell>
                <TableCell style={{ border: "2px solid rgb(170 209 187)", ...tableStyles }}>{row.date}</TableCell>
                <TableCell style={{ border: "2px solid rgb(170 209 187)", ...tableStyles }}>{row.name}</TableCell>
                <TableCell style={{ border: "2px solid rgb(170 209 187)", ...tableStyles }}>{row.modelNum}</TableCell>
                <TableCell style={{ border: "2px solid rgb(170 209 187)", ...tableStyles }}>{row.modelName}</TableCell>
                <TableCell
                  style={{
                    border: "2px solid rgb(170 209 187)",
                    ...tableStyles,
                    color: row.status === "Done" ? "green" : "red",
                  }}
                >
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>        
      </Box>
    </>
  );
}
