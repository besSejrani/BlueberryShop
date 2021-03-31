import React from "react";

// Material-UI
import { Box, Breadcrumbs, Link, Typography, Tab } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

// Guard
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Blueberry = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.header}>
          <Box>
            <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
              Settings
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">Business</Link>
              <Link color="inherit" href="/components/breadcrumbs/" aria-current="page">
                Settings
              </Link>
            </Breadcrumbs>
          </Box>
        </Box>

        <Box>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Payment Gateways" value="1" />
              <Tab label="Taxes" value="2" />
              <Tab label="Settings" value="3" />
            </TabList>

            <TabPanel value="1">Payment Gateways</TabPanel>
            <TabPanel value="2">Taxes</TabPanel>
            <TabPanel value="3">Settings</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(Blueberry);

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0px 0px 50px 0px",
    },
  })
);
