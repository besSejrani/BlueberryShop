import React, { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setProducts, getItemCart } from "../../Redux/product/productAction";

// Apollo
import { useGetProductsQuery } from "../../Graphql/index";

// Material-Ui
import { Container, Box, TextField, Select, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

// Components
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductFilter from "../../Components/ProductFilter/ProductFilter";

// Data
import { items } from "../../Data/productData";

// SSR
import withApollo from "../../Apollo/ssr";
import { getDataFromTree } from "@apollo/react-ssr";

// ========================================================================================================

const Products = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { loading, data } = useGetProductsQuery({ variables: { pageNumber: page, pageSize: 12 } });
  const pages = Math.ceil(data?.getProducts.count / 12);

  useEffect(() => {
    dispatch(setProducts(items));
    dispatch(getItemCart());
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <form noValidate autoComplete="off">
        <Box className={classes.search}>
          <TextField fullWidth id="outlined-basic" label="Search Product" variant="outlined" />
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value="Best Match" variant="outlined">
            <MenuItem value={"Best Match"}>Best Match</MenuItem>
            <MenuItem value={"Ascending Price"}>Ascending Price</MenuItem>
            <MenuItem value={"Descending Price"}>Descending Price</MenuItem>
          </Select>
        </Box>
      </form>

      <Box className={classes.products}>
        <ProductFilter />
        <Box className={classes.grid}>
          {data?.getProducts.products.map((product) => {
            return <ProductCard key={product._id} product={product} loading={loading} />;
          })}
        </Box>
      </Box>

      <div className={classes.pagination}>
        <Pagination count={pages} color="primary" page={page} onChange={handleChange} />
      </div>
    </Container>
  );
};

export default withApollo(Products, { getDataFromTree });

// =================================================================
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridGap: "1.5rem",
    },
    search: {
      margin: "80px 0px 50px 0px",
      display: "flex",
    },
    products: {
      height: "100%",
      display: "flex",
      margin: "70px 0px 80px 0px",
      justifyContent: "start",
    },
    pagination: {
      "& > *": {
        marginTop: theme.spacing(2),
        margin: "0px 0px 50px 0rem",
        display: "flex",
        justifyContent: "center",
      },
    },
  })
);
