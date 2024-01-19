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
} from "@mui/material";
import { getAllProducts } from "../services/products";

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

  return (
    <TableContainer component={Paper}>
      <Toolbar />
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
            <TableCell>
              <Typography variant="h6">Quantity</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">isFeaturedAd</Typography>
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
          ).map((row) => (
            <TableRow key={productListing.productId}>
              <TableCell>{productListing.productId}</TableCell>
              <TableCell>{productListing.name}</TableCell>
              <TableCell>{productListing.description}</TableCell>
              <TableCell>{productListing.price}</TableCell>
              <TableCell>{productListing.quantity}</TableCell>
              <TableCell>{productListing.isFeaturedAd}</TableCell>
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
