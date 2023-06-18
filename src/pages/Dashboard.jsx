import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// import AppBar from './AppBar';

import PersistentDrawerMain from "../components/PersistentDrawerMain";
import PersistentDrawerAppBar from "../components/PersistentDrawerAppBar";
import PersistentDrawer from "../components/PersistentDrawer";
import Categories from "../components/Categories";
import Vehicial from "../components/Vehicial";
import DashboardPage from "../components/DashboardPage";

export default function PersistentDrawerLeft() {
  const [open, setOpen] = useState(true);
  const [currentComponent, setCurrentComponent] = useState("dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const componentObj = {
    dashboard: <DashboardPage/>,
    categories: <Categories />,
    vehicials: <Vehicial />,
  };

  const renderComponent = () => {
    return componentObj[currentComponent];
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PersistentDrawerAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <PersistentDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleListButtonClick={(value) => {
          setCurrentComponent(value);
        }}
      />
      <PersistentDrawerMain open={open}>
        {renderComponent()}
      </PersistentDrawerMain>
    </Box>
  );
}
