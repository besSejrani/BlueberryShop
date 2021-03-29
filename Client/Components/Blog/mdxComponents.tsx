// Next
import Image from "next/image";

// Components MDX
import { Typography, Card, Table, TableHead, TableRow, TableCell, Box } from "@material-ui/core";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles"

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
  hr: () => <hr style={{ margin: "30px 0px" }} />,
  br: () => <Box style={{ height: "20px" }} />,
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
    <Card style={{ backgroundColor: "white", margin: "50px 0px", padding: "50px", borderRadius: "20px" }}>
      {children}
    </Card>
  ),
  pre:({children}) => {
    const classes = useStyles()

    return (
      <pre>
          {children}
    </pre>
      )
    }
};

export default Components;

// ========================================================================================================

const useStyles = makeStyles((theme:Theme)=> createStyles({
  pre:{
    borderRadius:" 0px 0px 10px 10px",
    // backgroundColor: "#2196f3",
    padding:"30px 10px",
    overflowX:"auto",
    tabSize:4,
  }
}))