import React from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// ========================================================================================================

const BackButton = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.backButton} onClick={() => router.back()}>
      <IconButton edge="start">
        <ArrowBackIcon color="primary" />
      </IconButton>
      <Typography variant="body1">Go Back</Typography>
    </Box>
  );
};

export default BackButton;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButton: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      width: "150px",
      padding: "0px 0px 15px 0px",
    },
  })
);
