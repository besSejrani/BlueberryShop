import React from "react";

// Material-Ui
import { Container, Box, Card, Button, Divider, Typography, IconButton, Collapse } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import clsx from "clsx";

// Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Moment
import moment from "moment";

// GraphQL
import { useGetOrdersQuery } from "@Graphql/index";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withAuth } from "@Guard/withAuth";

// ========================================================================================================

const Orders = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [values, setValues] = React.useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // GraphQL
  const { data, loading } = useGetOrdersQuery();

  if (loading) return <div>Loading ...</div>;

  return (
    <Container>
      {data?.getOrders.map((order, index) => (
        <Card className={classes.root}>
          <Box className={classes.information}>
            <Box style={{ display: "flex", flexDirection: "column", height: "50px", justifyContent: "space-between" }}>
              <Typography variant="body2" style={{ fontSize: "1rem" }}>
                <span
                  style={{
                    padding: "3px 5px",
                    borderRadius: 99,
                    backgroundColor: "rgba(84, 214, 44, 0.16)",
                    color: "rgb(34, 154, 22)",
                  }}
                >
                  Order ID:{order._id}
                </span>
              </Typography>

              <Typography variant="body2" style={{ fontSize: "1rem" }}>
                <span
                  style={{
                    padding: "3px 5px",
                    borderRadius: 99,
                    backgroundColor: "rgba(19, 77, 124, 0.116)",
                    color: "#2196f3",
                  }}
                >
                  Date :{moment(order.createdAt).format("DD.MM.yyyy")}
                </span>
              </Typography>
            </Box>

            <Button
              href={`http://localhost:4000/${order._id}/pdf`}
              variant="contained"
              color="secondary"
              style={{ justifySelf: "end" }}
            >
              PDF
            </Button>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          <Divider />

          <Collapse in={index === 0 ? !expanded : expanded} timeout="auto" unmountOnExit>
            <Box className={classes.productBody}>
              <Box className={classes.productsHeader}>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr 1fr 1fr",
                    gridGap: "1rem",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ padding: "0px 0px 0px 20px", fontSize: "1rem", fontWeight: 500 }}
                  >
                    Product
                  </Typography>

                  <Typography variant="body2" style={{ fontSize: "1rem", fontWeight: 500 }}>
                    Quantity
                  </Typography>

                  <Typography variant="body2" style={{ justifySelf: "center", fontSize: "1rem", fontWeight: 500 }}>
                    Unit Price
                  </Typography>

                  <Typography variant="body2" style={{ justifySelf: "end", fontSize: "1rem", fontWeight: 500 }}>
                    Total Price
                  </Typography>
                </Box>
              </Box>

              {order.cart.map((product) => (
                <Box className={classes.products}>
                  <Box
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 1fr 1fr 1fr",
                      gridGap: "1rem",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box className={classes.productInformation}>
                      <img
                        src={product.productImages[0] || "/images/unknownProduct.png"}
                        alt=""
                        width="100"
                        height="100"
                      />
                      <Typography>{product.name}</Typography>
                    </Box>

                    <Typography>1</Typography>

                    <Typography style={{ justifySelf: "center" }}>{product.price}.-</Typography>

                    <Typography style={{ justifySelf: "end" }}>{product.price}.-</Typography>
                  </Box>

                  <Divider />
                </Box>
              ))}

              <Box style={{ padding: "20px 20px 10px 20px" }}>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr 1fr 1fr",
                    gridGap: "1rem",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {" "}
                  </Typography>

                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    Taxes
                  </Typography>

                  <Typography variant="body1" style={{ justifySelf: "center", fontWeight: 500 }}>
                    7.7%
                  </Typography>

                  <Typography variant="body1" style={{ justifySelf: "end", fontWeight: 500 }}>
                    5.-
                  </Typography>
                </Box>
              </Box>

              <Box style={{ padding: "20px 20px 10px 20px" }}>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr 1fr 1fr",
                    gridGap: "1rem",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {" "}
                  </Typography>

                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    Stripe Fees
                  </Typography>

                  <Typography variant="body1" style={{ justifySelf: "center", fontWeight: 500 }}>
                    2.9%
                  </Typography>

                  <Typography variant="body1" style={{ justifySelf: "end", fontWeight: 500 }}>
                    5.-
                  </Typography>
                </Box>
              </Box>

              <Box style={{ padding: "10px 20px 0px 20px" }}>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr  2.05fr",

                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1"> </Typography>
                  <Divider />
                </Box>
              </Box>

              <Box style={{ padding: "20px 20px 20px 20px" }}>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.02fr 1.02fr",
                    gridGap: "1rem",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1"> </Typography>

                  <Box
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr  1fr",
                      gridGap: "1rem",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body1" style={{ fontWeight: 500 }}>
                      Total
                    </Typography>
                  </Box>

                  <Typography variant="body1" style={{ justifySelf: "end", fontWeight: 500 }}>
                    {order.amount}.-
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Card>
      ))}

      <div className={classes.pagination}>
        <Pagination count={10} color="primary" page={1} />
      </div>
    </Container>
  );
};

export default withApollo({ ssr: false })(withAuth(Orders));

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 15,
      margin: "0px 0px 50px 0px",
    },
    information: {
      display: "grid",
      gridTemplateColumns: "5fr 2fr 0.1fr",
      gridGap: "1rem",
      padding: "20px 50px 20px 60px",
      alignItems: "center",
      justifySelf: "center",
    },

    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },

    productBody: {
      padding: "10px 30px",
    },

    productsHeader: {
      display: "flex",
      justifyContent: "space-between",
      padding: "30px 20px 10px 20px",
    },

    products: {
      display: "flex",
      flexDirection: "column",
      padding: "0px 20px",
    },

    product: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    productInformation: {
      display: "flex",
      alignItems: "center",
    },
    pagination: {
      margin: "50px 0px",
      "& > *": {
        marginTop: theme.spacing(2),
        margin: "0px 0px 50px 0rem",
        display: "flex",
        justifyContent: "center",
      },
    },
  }),
);
