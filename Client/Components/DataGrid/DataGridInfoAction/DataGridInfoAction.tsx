import React from "react";

//Next
import Link from "next/link";

// Material-UI
import { Box, Breadcrumbs, Link as MaterialLink, Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// ========================================================================================================

interface DataGridInfoActionType {
  title: string;
  action?: string;
  path?: string;
}

const DataGridInfoAction: React.FC<DataGridInfoActionType> = ({ title, action, path }) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box>
        <Typography variant="h5" style={{ margin: "0px 0px 10px 0px" }}>
          {title}
        </Typography>

        <Breadcrumbs aria-label="breadcrumb">
          <MaterialLink href="/">Administration</MaterialLink>
          <MaterialLink color="inherit" href="/components/breadcrumbs/" aria-current="page">
            {title}
          </MaterialLink>
        </Breadcrumbs>
      </Box>

      {path && action ? (
        <Link href={`${path}`} passHref>
          <Button variant="contained" color="secondary">
            {action}
          </Button>
        </Link>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default DataGridInfoAction;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0px 0px 50px 0px",
    },
  })
);
