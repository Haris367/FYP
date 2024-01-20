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

import { deleteProductById, getAllProducts } from "../services/products";
// import styled from "@emotion/styled";


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

function ProductListing() {
  const [productListing, setProductListing] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can set the number of rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      console.log(response.data);
      setProductListing(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    try {
      // Assuming you have a deleteProductById function in your service
      await deleteProductById(productId);

      // After deletion, fetch the updated product list
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component='main'>
      <Toolbar />
      <Typography variant="h4" ml={10}>
        Product Listing
      </Typography>
      <Toolbar />
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">
              <Typography sx={{font:'bold'}}> Product Id</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>Name</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Description</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Price</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography>Quantity</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography>isFeaturedAd</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="button">Delete</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? productListing.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : productListing
          ).map((productListing) => (
            <StyledTableRow key={productListing.productId}>
              <StyledTableCell align="right">{productListing.productId}</StyledTableCell>
              <StyledTableCell align="center">{productListing.name}</StyledTableCell>
              <StyledTableCell>{productListing.description}</StyledTableCell>
              <StyledTableCell>{productListing.price}</StyledTableCell>
              <StyledTableCell align="right">{productListing.quantity}</StyledTableCell>
              <StyledTableCell>{productListing.isFeaturedAd}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(productListing.productId)}
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
        count={productListing.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ProductListing;
