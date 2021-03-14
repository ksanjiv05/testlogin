import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Login from "./components/Login";
import Private from "./components/Private";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function App() {
  const [auth, setAuth] = useState(false);
  const [varient, setVarient] = useState("");
  const [responce, setResponce] = useState("");
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  console.log("auth ", auth);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={varient}>
              {responce}
            </Alert>
          </Snackbar>
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                setAuth={setAuth}
                setResponce={setResponce}
                setOpen={setOpen}
                setVarient={setVarient}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                setAuth={setAuth}
                setResponce={setResponce}
                setOpen={setOpen}
                setVarient={setVarient}
              />
            )}
          />
          <Route
            path="/private"
            render={() =>
              auth ? (
                <Private />
              ) : (
                <Login
                  setAuth={setAuth}
                  setResponce={setResponce}
                  setOpen={setOpen}
                  setVarient={setVarient}
                />
              )
            }
            // render={() => <Private />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
