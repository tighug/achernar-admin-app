import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: green[500],
    },
    background: {
      default: "#1E2126",
      paper: "#23272E",
    },
  },
});
