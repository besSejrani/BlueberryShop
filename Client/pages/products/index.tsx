import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { Container, Box, TextField, Select, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

// Components
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductFilter from "../../Components/ProductFilter/ProductFilter";

// Apollo
import { useGetProductsPaginationQuery } from "../../Graphql/index";

// SSR
import withApollo from "../../Apollo/ssr"

// ========================================================================================================

const Products = () => {
  const classes = useStyles();

  // Router
  const router = useRouter();
  const { page = 1, size = 12 } = router.query;

  // State
  const [pageNumber, setPageNumber] = useState(+page);
  const [pageSize, setPageSize] = useState(+size);

  const { loading, data } = useGetProductsPaginationQuery({
    variables: { pageNumber: +pageNumber, pageSize: pageSize },
  });
  const pages = Math.ceil(data?.getProductsPagination.count / pageSize);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);

    router.push(`/products?page=${value}&size=${pageSize}`, ``, {
      shallow: true,
    });
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
          {data?.getProductsPagination.products.map((product) => {
            return <ProductCard key={product._id} product={product} loading={loading} />;
          })}
        </Box>
      </Box>

      <div className={classes.pagination}>
        <Pagination count={pages} color="primary" page={pageNumber} onChange={handleChange} />
      </div>
    </Container>
  );
};

export default withApollo({ssr:true})(Products);

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
