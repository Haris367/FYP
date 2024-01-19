import React, { useState, useEffect, useCallback } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Box,
  TableSortLabel,
} from "@mui/material";
// import Title from "../styles/Title";
import "./pages.styles.css";

import { getAllInspectionRequests } from "../services/inspection";

const tableStyles = {
  textAlign: "center",
};

// export const totalCount = rows.length;
export default function Inspection({ showAll = true }) {
  const [inspection, setInspection] = useState([]);
  const [orderBy, setOrderBy] = useState("Date");
  const [order, setOrder] = useState("asc");

  const fetchInspectionRequest = useCallback(async () => {
    try {
      const response = await getAllInspectionRequests();
      console.log(response.data);
      setInspection(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchInspectionRequest();
  }, [fetchInspectionRequest]);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // if showAll false , then display 4 rows else display all
  // const allRows = showAll ? rows : inspectio.slice(0, 4); // xcan be better

  return (
    <>
      <Box className="pageStyling" component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Typography><Typography> */}
        <Toolbar />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Inspection Id</TableCell>
              <TableCell>Model Name</TableCell>
              <TableCell sortDirection={orderBy === "Date" ? order : false}>
                <TableSortLabel
                  active={orderBy === "Date"}
                  direction={orderBy === "Date" ? order : "asc"}
                  onClick={() => handleSortRequest("Date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspection
              .sort((a, b) => {
                if (order === "asc") {
                  return a[orderBy] > b[orderBy] ? 1 : -1;
                } else {
                  return b[orderBy] > a[orderBy] ? 1 : -1;
                }
              })
              .map((inspection) => (
                <TableRow key={inspection.inspectionId} className="rowHighlight">
                  <TableCell>{inspection.inspectionId}</TableCell>
                  <TableCell>{inspection.modelName}</TableCell>
                  <TableCell>{inspection.date}</TableCell>
                  <TableCell>{inspection.homeAddress}</TableCell>
                  <TableCell
                    style={{
                      color: inspection.status === "Done" ? "green" : "red",
                    }}
                  >
                    {inspection.status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
