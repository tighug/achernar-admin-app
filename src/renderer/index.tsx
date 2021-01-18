import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/pages/Home";
import "normalize.css";
import "./index.css";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
});
