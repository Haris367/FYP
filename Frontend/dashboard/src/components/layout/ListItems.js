import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AppSettingsAltTwoTone as InspectionIcon,
  SellTwoTone as SellItForMeIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  Assignment as AssignmentIcon
} from "@mui/icons-material";

import { Link } from "react-router-dom";
// import Charts from "./Charts";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/inspection">
      <ListItemIcon>
        <InspectionIcon />
      </ListItemIcon>
      <ListItemText primary="Inspection" />
    </ListItemButton>
    <ListItemButton component={Link} to="/requests">
      <ListItemIcon>
        <SellItForMeIcon />
      </ListItemIcon>
      <ListItemText primary="Sell for me Requests" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton> */}
    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
