import React from "react";

//Next
import Link from "next/link";
import Image from "next/image";

// Material-UI
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import PersonIcon from '@material-ui/icons/Person';

// Apollo State
import { ui } from "../../Apollo/state/ui";

// ========================================================================================================

const adminHeader = () => {
  const classes = useStyles();

  const changeState = () => {
    ui({ isAdmin: false });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
        <Link href="/">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image width={60} height={40} src={"/raspberry.svg"} alt="Raspberry Pi Logo" />
            <Typography variant="h6">BlueberryShop</Typography>
          </Box>
        </Link>


        <IconButton  onClick={changeState}>
          <PersonIcon style={{color:"white", borderRadius:90, fontSize:"25px", backgroundColor: "grey", padding: "3px"}}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default adminHeader;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);
