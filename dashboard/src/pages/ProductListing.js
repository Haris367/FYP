import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Paper,
  TablePagination,
  Typography,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { deleteProductById, getAllProducts } from "../services/products";

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
    <TableContainer component={Paper}>
      <Toolbar />
      <Toolbar />
      <Typography variant="h3">Product Listing</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Id</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Price</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Quantity</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">isFeaturedAd</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Delete</Typography>
            </TableCell>
            
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
            <TableRow key={productListing.productId}>
              <TableCell align="left">{productListing.productId}</TableCell>
              <TableCell align="left">{productListing.name}</TableCell>
              <TableCell>{productListing.description}</TableCell>
              <TableCell>{productListing.price}</TableCell>
              <TableCell align="right">{productListing.quantity}</TableCell>
              <TableCell>{productListing.isFeaturedAd}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(productListing.productId)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
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
    </TableContainer>
  );
}

export default ProductListing;
