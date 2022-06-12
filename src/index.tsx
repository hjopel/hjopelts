import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const colors = {
  dark: {
    bg: "#232602",
    ac: "#e7edec",
  },
  light: {
    bg: "#ffffff",
    ac: "#303133",
  },
};
// #232692
// #e7edec

// #fef9eb
// #303133
const theme = extendTheme({
  colors,
  fonts: {
    heading: "Raleway, sans-serif",
    body: "Arapey, serif",
    // body: "Frank Ruhl Libre, serif",
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
