import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import axios from "axios";

const buttonStyle = {
  backgroundColor: "#53a918fa",
  fontSize: "inherit",
  fontWeight: 700,
  color: "white",
};

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });

  const [error, setError] = useState({ email: false, password: false });

  const history = useHistory();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setError({ email: false, password: false });
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, "---", value);
  };

  const handleSubmit = () => {
    if (data && data.email.length < 5) {
      setError((prevData) => ({
        ...prevData,
        email: true,
      }));
      return;
    }
    if (data && data.password.length < 5) {
      setError((prevData) => ({
        ...prevData,
        password: true,
      }));
      return;
    }
    console.log("auth ", props.setAuth);
    axios
      .post("http://localhost:3001/login", data)
      .then((responce) => {
        console.log("responce ", responce);
        props.setResponce(responce.data.success);
        props.setOpen(true);
        props.setVarient("success");
        props.setAuth(true);
        history.push("/private");
      })
      .catch((err) => {
        console.error("error ", err);
        props.setResponce("Please enter valid auth details !!");
        props.setOpen(true);
        props.setVarient("error");
      });
    console.log("data", data);
  };
  return (
    <>
      <div style={{ display: "inline-grid", width: "496px" }}>
        <TextField
          error={error.email}
          name="email"
          onChange={(ev) => handleChange(ev)}
          label="Username"
          helperText={error.email ? "Please enter valid input" : ""}
          size="medium"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBoxIcon />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          error={error.password}
          name="password"
          type="password"
          onChange={(ev) => handleChange(ev)}
          label="Password"
          helperText={error.password ? "Please enter valid input " : ""}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={handleSubmit}
          style={buttonStyle}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
