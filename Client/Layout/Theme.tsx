import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { grey, blue } from "@material-ui/core/colors";
// import { useSelector } from "react-redux";
// import { IAppState } from "../redux/rootReducer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
      light: "white",
    },
    secondary: {
      main: blue[500],
    },
    //   type: isDarkTheme ? "dark" : "light",
    type: "light",
  },
});

export default theme;

// =================================================================

const Theme: React.FC<any> = (props) => {
  //   const isDarkTheme = useSelector((state: IAppState) => state.ui.isDarkTheme);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export const withTheme = (Component) => (props) => (
  <Theme>
    <Component {...props} />
  </Theme>
);
