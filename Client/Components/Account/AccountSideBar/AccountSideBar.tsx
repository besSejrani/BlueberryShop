import React from "react";

// Next
import Link from "next/link";

// Material-UI
import { Card, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Icons
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LockIcon from "@material-ui/icons/Lock";

// ========================================================================================================

const AccountSideBar = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link href="account#profile">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>

        <Link href="account#billing">
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Billing Information" />
          </ListItem>
        </Link>

        <Link href="account#shipping">
          <ListItem button>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Shipping Information" />
          </ListItem>
        </Link>

        <Link href="account#reset">
          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Reset Password" />
          </ListItem>
        </Link>
      </List>
    </Card>
  );
};

export default AccountSideBar;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "sticky",
      top: "85px",
      maxWidth: "250px",
      height: "100%",
      marginRight: "2.5rem",
      borderRadius: 10,
    },
  }),
);
