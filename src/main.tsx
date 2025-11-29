import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import { store } from "./store/store";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      // slateblue ≈ rgb(106, 90, 205)
      main: "rgb(106, 90, 205)",
    },
    secondary: {
      // mediumslateblue ≈ rgb(123, 104, 238)
      main: "rgb(123, 104, 238)",
    },

    background: {
      // ghostwhite ≈ rgb(248, 248, 255)
      default: "rgb(248, 248, 255)",
      paper: "rgb(255, 255, 255)",
    },

    text: {
      primary: "rgb(0, 0, 0)",        // black
      secondary: "rgb(105, 105, 105)" // dimgray
    },
  },

  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h5: {
      fontWeight: 700,
      color: "rgb(0, 0, 0)",
    },
    button: {
      fontWeight: 600,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // gradients can still use color *names*
          background: "linear-gradient(135deg, royalblue, slateblue)",
          color: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "linear-gradient(145deg, white, whitesmoke)",
          border: "1px solid lightsteelblue",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
          textTransform: "none",
          background: "linear-gradient(135deg, royalblue, mediumslateblue)",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "0.3s",

          "&:hover": {
            background: "linear-gradient(135deg, mediumblue, slateblue)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(6px)",

            "& fieldset": {
              borderColor: "lightsteelblue",
            },
            "&:hover fieldset": {
              borderColor: "royalblue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "slateblue",
            },
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
