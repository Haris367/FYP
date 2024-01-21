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
  styled,
  tableCellClasses,
  TablePagination,
  Typography,
} from "@mui/material";
// import Title from "../styles/Title";
import "./pages.styles.css";

import { getAllInspectionRequests } from "../services/inspection";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// const tableStyles = {
//   textAlign: "center",
// };

// export const totalCount = rows.length;
export default function Inspection({ showAll = true }) {
  const [inspection, setInspection] = useState([]);
  const [orderBy, setOrderBy] = useState("Date");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // if showAll false , then display 4 rows else display all
  // const allRows = showAll ? rows : inspectio.slice(0, 4); // xcan be better

  return (
      <Box className="pageStyling" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        <Typography variant="h6">Inspection Request</Typography>
        <Toolbar/>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Inspection Id</StyledTableCell>
              <StyledTableCell>Model Name</StyledTableCell>
              <StyledTableCell
                sortDirection={orderBy === "Date" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "Date"}
                  direction={orderBy === "Date" ? order : "asc"}
                  onClick={() => handleSortRequest("Date")}
                >
                  Date
                </TableSortLabel>
                {/* date formate: yyyy-mm-dd*/}
              </StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspection
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort((a, b) => {
                if (order === "asc") {
                  return a[orderBy] > b[orderBy] ? 1 : -1;
                } else {
                  return b[orderBy] > a[orderBy] ? 1 : -1;
                }
              })
              .map((inspection) => (
                <StyledTableRow
                  key={inspection.inspectionId}
                  className="rowHighlight"
                >
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
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // You can customize the rows per page options
          component="div"
          count={inspection.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
  );
}
