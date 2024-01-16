import React, { useState, useEffect, useCallback } from "react";

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

import { getAllInspectionRequests } from "../services/inspection";

const tableStyles = {
  textAlign: "center",
};
// export const totalCount = rows.length;
export default function Inspection({ showAll = true }) {
  const [inspection, setInspection] = useState([]);

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
              <TableCell style={tableStyles} className="tableHeaderCell">
                Inspection Id
              </TableCell>
              <TableCell style={tableStyles} className="tableHeaderCell">
                Model Name
              </TableCell>
              <TableCell style={tableStyles} className="tableHeaderCell">
                Date
              </TableCell>
              <TableCell style={tableStyles} className="tableHeaderCell">
                IMEI
              </TableCell>
              <TableCell style={tableStyles} className="tableHeaderCell">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspection.map((inspection) => (
              <TableRow key={inspection.id} className="rowHighlight">
                <TableCell
                  style={{
                    border: "2px solid rgb(170 209 187)",
                    ...tableStyles,
                  }}
                >
                  {inspection.inspectionId}
                </TableCell>
                <TableCell
                  style={{
                    border: "2px solid rgb(170 209 187)",
                    ...tableStyles,
                  }}
                >
                  {inspection.modelName}
                </TableCell>
                <TableCell
                  style={{
                    border: "2px solid rgb(170 209 187)",
                    ...tableStyles,
                  }}
                >
                  {inspection.Date}
                </TableCell>
                <TableCell
                  style={{
                    border: "2px solid rgb(170 209 187)",
                    ...tableStyles,
                  }}
                >
                  {inspection.IMEI}
                </TableCell>
                <TableCell
                  style={{
                    border: "2px solid rgb(170 209 187)",
                    ...tableStyles,
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
