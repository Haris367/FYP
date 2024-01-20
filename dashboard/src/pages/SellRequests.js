import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  TablePagination,
  Typography,
  IconButton,
  Box,
  tableCellClasses,
  styled,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { deleteSellRequestById, getAllSellRequests } from "../services/requsets";


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function SellRequests() {
  const [sellRequestt, setSellRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can set the number of rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchRequests = useCallback(async () => {
    try {
      const response = await getAllSellRequests();
      console.log(response.data);
      setSellRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDelete = async (SellitForMeID) => {
    try {
      // Assuming you have a deleteProductById function in your service
      await deleteSellRequestById(SellitForMeID);

      // After deletion, fetch the updated product list
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component='main'>
      <Toolbar />
      <Typography variant="h4" ml={10}>Sell For me</Typography>
      <Toolbar />
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">
              Request Id
            </StyledTableCell>
            <StyledTableCell align="center">
              User Name
            </StyledTableCell>
            <StyledTableCell>
              Phone Number
            </StyledTableCell>
            <StyledTableCell>
              Address
            </StyledTableCell>
            <StyledTableCell>
             Model Name
            </StyledTableCell>
            <StyledTableCell align="right">
              Mobile Description
            </StyledTableCell>
            <StyledTableCell align="right">
              Inspection Slot
            </StyledTableCell>
            <StyledTableCell align="right">
              Inspection Time
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="button">Delete</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sellRequestt.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : sellRequestt
          ).map((sellRequestt) => (
            <StyledTableRow key={sellRequestt.SellitForMeID}>
              <StyledTableCell align="right">{sellRequestt.SellitForMeID}</StyledTableCell>
              <StyledTableCell align="center">{sellRequestt.name}</StyledTableCell>
              <StyledTableCell>{sellRequestt.phoneNumber}</StyledTableCell>
              <StyledTableCell>{sellRequestt.Address}</StyledTableCell>
              <StyledTableCell align="right">{sellRequestt.mobileDescription}</StyledTableCell>
              <StyledTableCell>{sellRequestt.inspectionSlot}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(sellRequestt.SellitForMeID)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Customize the rows per page options
        component="div"
        count={sellRequestt.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default SellRequests;
