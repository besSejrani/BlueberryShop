import React from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// ========================================================================================================

const MultiStep = ({ first, second, third }) => {
  const classes = useStyles();

  // Router
  const { pathname } = useRouter();
  const parameters = pathname.split("/");
  const param = parameters.filter((value) => value === "shipping" || value === "payment" || value === "done");

  return (
    <Box className={classes.root}>
      <Box className={classes.multiStep}>
        <Box className={classes.check}>
          <Box
            className={classes.shipping}
            style={{
              backgroundColor: param[0] === "shipping" ? "#212121" : "white",
              backgroundColor: param[0] !== "shipping" ? "white" : "#212121",
              color: param[0] !== "shipping" ? "#212121" : "white",
              color: param[0] === "shipping" ? "white" : "#212121",
            }}
          >
            <Typography style={{ fontSize: "0.9rem" }}>1</Typography>
          </Box>
          <Typography style={{ marginTop: 10, fontSize: "0.9rem" }}>{first}</Typography>
        </Box>

        <Box className={classes.check}>
          <Box
            className={classes.billing}
            style={{
              backgroundColor: param[0] === "payment" ? "#212121" : "white",
              backgroundColor: param[0] !== "payment" ? "white" : "#212121",
              color: param[0] !== "payment" ? "#212121" : "white",
              color: param[0] === "payment" ? "white" : "#212121",
            }}
          >
            <Typography style={{ fontSize: "0.9rem" }}>2</Typography>
          </Box>
          <Typography style={{ marginTop: 10, fontSize: "0.9rem" }}>{second}</Typography>
        </Box>

        <hr className={classes.line} />

        <Box className={classes.check}>
          <Box
            className={classes.done}
            style={{
              backgroundColor: param[0] === "done" ? "#212121" : "white",
              backgroundColor: param[0] !== "done" ? "white" : "#212121",
              color: param[0] !== "done" ? "#212121" : "white",
              color: param[0] === "done" ? "white" : "#212121",
            }}
          >
            <Typography style={{ fontSize: "0.9rem" }}>3</Typography>
          </Box>
          <Typography style={{ marginTop: 10, fontSize: "0.9rem" }}>{third}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MultiStep;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
      padding: "50px 400px",
    },
    multiStep: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    check: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    shipping: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #212121",
      width: 22,
      height: 22,
      borderRadius: "99px",
      justifySelf: "center",
      backgroundColor: "white",
      zIndex: 10,
    },
    billing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #212121",
      width: 22,
      height: 22,
      borderRadius: "99px",
      backgroundColor: "white",
      zIndex: 10,
    },
    done: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #212121",
      width: 22,
      height: 22,
      borderRadius: "99px",
      backgroundColor: "white",
      zIndex: 10,
    },
    line: {
      position: "absolute",
      top: "40%",
      left: "35%",
      width: "calc(100% - 840px)",
      backgroundColor: "#212121",
    },
  }),
);
