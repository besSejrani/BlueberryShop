import React from "react";

// Next
import Link from "next/link";

// Material-UI
import { Box, Drawer, Toolbar, List, ListSubheader, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

//Icons
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import GroupIcon from "@material-ui/icons/Group";
import MailIcon from "@material-ui/icons/Mail";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SubjectIcon from "@material-ui/icons/Subject";
import DescriptionIcon from "@material-ui/icons/Description";

// ========================================================================================================

const drawerWidth = 240;

const AdminSideDrawer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List subheader={<ListSubheader>Management</ListSubheader>}>
            <Link href="/admin/dashboards/">
              <ListItem button>
                <ListItemIcon>
                  <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link href="/admin/products/">
              <ListItem button>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
            </Link>

            <Link href="/admin/users">
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>

            <Link href="/admin/orders">
              <ListItem button>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </Link>
          </List>

          <Link href="/admin/articles/">
            <ListItem button>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Articles" />
            </ListItem>
          </Link>

          <a href="https://bessejrani.github.io/BlueberryShop/" target="_blank">
            <ListItem button>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Documentation" />
            </ListItem>
          </a>
        </div>
      </Drawer>
    </Box>
  );
};

export default AdminSideDrawer;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
      width: 240,
    },

    drawer: {
      width: drawerWidth,
      position: "fixed",
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
  })
);
