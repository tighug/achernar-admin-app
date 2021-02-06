import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/page/Home";
import dark from "./theme/dark";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import "normalize.css";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={dark}>
        <StyledThemeProvider theme={dark}>
          <StylesProvider injectFirst>
            <Home />
          </StylesProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
});
