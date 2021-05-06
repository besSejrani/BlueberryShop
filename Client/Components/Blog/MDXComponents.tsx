// Next
import Image from "next/image";

// Material-UI
import { Typography, Card, Table, TableHead, TableRow, TableCell, Box } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";

// Components
import Newsletter from "@Components/Newsletter/Newsletter";

// ========================================================================================================

const Components = {
  h1: ({ children }) => {
    return <Typography variant="h1">{children}</Typography>;
  },
  h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
  h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
  h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
  h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
  p: ({ children }) => <Typography variant="body1">{children}</Typography>,
  hr: () => <hr style={{ margin: "20px 0px" }} />,
  br: () => <Box style={{ height: "25px" }} />,
  table: ({ children }) => <Table>{children}</Table>,
  thead: ({ children }) => <TableHead>{children}</TableHead>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => <TableCell>{children}</TableCell>,
  td: ({ children }) => <TableCell>{children}</TableCell>,
  img: (props) => {
    return (
      <Box style={{ textAlign: "center", margin: "30px 0px" }}>
        <Image src={props.src} height={500} width={1000} alt={props.alt} />
      </Box>
    );
  },
  hero: (props) => {
    return (
      <Box style={{ textAlign: "center", margin: "30px 0px" }}>
        <Image src={props.src} height={500} width={"100%"} alt={props.alt} />
      </Box>
    );
  },
  card: ({ children }) => (
    <Card style={{ backgroundColor: "white", margin: "0px 0px", padding: "50px", borderRadius: "20px" }}>
      {children}
    </Card>
  ),

  pre: ({ children }) => {
    const classes = useStyles();

    return (
      <Box>
        <pre className={classes.pre}>{children}</pre>
        <br />
      </Box>
    );
  },
  newsletter: () => {
    return <Newsletter />;
  },

  rating: () => {
    return (
      <Rating
        // value={product.rating}
        value={5}
        readOnly
        size="medium"
        name="customized-color"
        defaultValue={4}
        precision={0.5}
      />
    );
  },
};

export default Components;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    pre: {
      "& code": {
        padding: "20px 10px",
        tabSize: 4,
        overflowX: "auto",
        borderRadius: "0px 0px 10px 10px",
      },
    },
  }),
);
