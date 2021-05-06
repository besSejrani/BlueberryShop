import React from "react";

// Material-Ui
import { Box, Paper, TextField, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const ProductFilter = () => {
  const classes = useStyles();

  return (
    <Box className={classes.category}>
      <Paper style={{ height: "650px", borderRadius: "10px", maxWidth: "195px" }} elevation={2}>
        <Box className={classes.filter}>
          <Typography variant="h6" id="price-slider" gutterBottom>
            Product Filters
          </Typography>
        </Box>

        <Box className={classes.filter}>
          <Typography variant="body2" id="price-slider" gutterBottom style={{ fontWeight: 500 }}>
            Categories
          </Typography>

          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" disableRipple size="small" />}
            label="Raspberry Pi"
            labelPlacement="end"
            classes={{ label: classes.label }}
          />

          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" disableRipple size="small" />}
            label="Accessories"
            labelPlacement="end"
            classes={{ label: classes.label }}
          />

          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" disableRipple size="small" />}
            label="Subscriptions"
            labelPlacement="end"
            classes={{ label: classes.label }}
          />
        </Box>

        <Box className={classes.filter}>
          <Typography variant="body2" id="price-slider" gutterBottom style={{ fontWeight: 500 }}>
            Shipping
          </Typography>

          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" disableRipple size="small" />}
            label="Free Shipping"
            labelPlacement="end"
            classes={{ label: classes.label }}
          />
        </Box>

        <Box className={classes.filter}>
          <Typography variant="body2" id="price-slider" gutterBottom style={{ fontWeight: 500 }}>
            Promotions
          </Typography>
          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" disableRipple size="small" />}
            label="Sales"
            labelPlacement="end"
            classes={{ label: classes.label }}
          />
        </Box>

        <Box className={classes.filter}>
          <Typography variant="body2" id="price-slider" gutterBottom style={{ fontWeight: 500 }}>
            Stock
          </Typography>

          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" disableRipple size="small" />}
            label="In Stock"
            labelPlacement="end"
            classes={{ label: classes.label }}
          />
        </Box>

        <Box className={classes.filter}>
          <Typography variant="body2" id="price-slider" gutterBottom style={{ fontWeight: 500 }}>
            Rating
          </Typography>

          <Box className={classes.filterRatings}>
            <Rating value={4} name="customized-color" defaultValue={2} precision={0.5} />
          </Box>
        </Box>

        <Box className={classes.filter}>
          <Typography variant="body2" id="price-slider" gutterBottom style={{ fontWeight: 500 }}>
            Price
          </Typography>
          <Box className={classes.price}>
            <TextField
              variant="outlined"
              id="minimumPrice"
              placeholder="Min"
              size="small"
              className={classes.priceInput}
            />
            <TextField
              variant="outlined"
              id="maximumPrice"
              placeholder="Max"
              size="small"
              className={classes.priceInput}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductFilter;

// =================================================================
const useStyles = makeStyles(() =>
  createStyles({
    category: {
      position: "sticky",
      top: "85px",
      maxWidth: "215px",
      height: "100%",
      marginRight: "2.5rem",
    },
    filter: {
      padding: "20px 20px 0px 20px",
    },
    filterRatings: {
      display: "flex",
      margin: "10px 0px 0px 0px",
    },
    price: {
      display: "flex",
    },
    priceInput: {
      margin: "10px 10px 0px 0px",
      padding: "0px 0px",
    },
    label: {
      fontSize: "0.9rem",
    },
  }),
);
