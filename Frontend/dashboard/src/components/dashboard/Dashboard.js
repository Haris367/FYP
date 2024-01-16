import * as React from "react";
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Charts from "./chart/Charts";
import Inspection from "../../pages/Inspection";
import Title from "../../styles/Title";
import { Link } from "react-router-dom";
import { totalCount } from "../../pages/Inspection";

export default function Dashboard() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={5}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Charts />
            </Paper>
          </Grid>
          <Grid item xs={7} sx={{ display: "flex", gap: 2 }}>
            <Paper
              sx={{
                pt: 4,
                pl: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
                width: 190,
              }}
            >
              <Title>Total Inspections</Title>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "medium",
                  fontSize: 25,
                  color: "#FF5A60",
                }}
              >
                {/* {totalCount} */}
              </Typography>
              {/* <Deposits /> */}
            </Paper>
            <Paper
              sx={{
                pt: 4,
                pl: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
                width: 190,
              }}
            >
              {/* <Title>Total Inspections</Title>
              <Typography sx={{textAlign: 'center' ,fontWeight: 'medium', fontSize: 25,color:"#2ecc71"}}>{totalCount}</Typography> */}
            </Paper>
            <Paper
              sx={{
                pt: 4,
                pl: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
                width: 190,
              }}
            >
              {/* <Title>Total Inspections</Title> */}
              {/* <Typography sx={{textAlign: 'center' ,fontWeight: 'medium', fontSize: 25,color:"#2ecc71"}}>{totalCount}</Typography> */}
            </Paper>
          </Grid>
          {/* Recent Inspection */}
          <Grid item xs={12}>
            <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
              <Title>Recent Inspections</Title>
              <Inspection showAll={false} sx={{ width: "1401.6px" }} />
              <Link
                to="/inspection"
                sx={{ marginLeft: 30, mt: 3, cursor: "pointer" }}
              >
                See more
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
