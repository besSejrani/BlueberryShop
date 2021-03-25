import React,{ useState } from 'react'

// Material-UI
import { Box, Tabs, Tab } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Components
import SalesProduct from "@Components/Sales/Product/Product"
import SalesCategory from "@Components/Sales/Category/Category"

// ========================================================================================================

const Sales = () => {

    const classes = useStyles()

    const [value, setValue] = React.useState(0);

    const [isSaleProduct, setIsSaleProduct] = useState(true);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    const renderForm = () => {
        if (isSaleProduct) {
          return <SalesProduct/>
        } else {
          return <SalesCategory/>
        }
      };


    return (
        <>
            {renderForm()}
            <Box className={classes.tabsContainer}>
            <Tabs
                className={classes.tabs}
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Product Sale" className={classes.tab} disabled={isSaleProduct} onClick={() => setIsSaleProduct(true)} />
                <Tab label="Category Sale" className={classes.tab} disabled={!isSaleProduct} onClick={() => setIsSaleProduct(false)} />
            </Tabs>
            </Box>
            
        </>
    )
}

export default Sales

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabsContainer: {
      display: "flex",
      justifyContent: "space-between",
      position: "absolute",
      bottom: "0px",
      left:"0px",
      width: "100%",
    },
    tabs: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    tab: {
      width: "100%",
    },
  })
);
