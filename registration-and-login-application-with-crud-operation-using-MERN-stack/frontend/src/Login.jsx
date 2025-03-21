import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
// import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  login = () => {
    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:2000/login', {
      username: this.state.username,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      // this.props.history.push('/dashboard');
      this.props.navigate("/dashboard");
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {

    // document.body.style.margin = "0";
    // document.body.style.padding = "0";
    // document.body.style.overflow = "hidden";
    // document.documentElement.style.height = "100%";
    // document.documentElement.style.width = "100%";
    return (

    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat", // Ensures the image is not repeated
        backgroundPosition: "center", // Centers the image
        // backgroundColor: "pink",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "aliceblue",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(210, 72, 72, 0.1)",
          width: "300px"
        }}
      >

          {/* <div
            style={{
              backgroundColor: "",
              padding: "20px",
              borderRadius: "8px",
              marginTop: "100px"
            }}
          > */}

      <div style={{ marginTop: '100px' }}>
        <div>
          <h2 style={{ textAlign:"center",margin:"5", borderLeft:"-20px"}}>Login </h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name*"
            variant="outlined"
            margin="normal"
          fullWidth
            required
          />
          <br />
          <TextField
            id="standard-basic"
            type={this.state.showPassword ? "text" : "password"} 
            // type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password*"
             variant="outlined"
            margin="normal"
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.togglePasswordVisibility}
                    edge="end"
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/register"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/register");
            }}
          >
            Register
          </Link>
        </div>
      </div>
      {/* </div> */}
      </div>
      </div>
    );
  }
}

export default withRouter(Login);