import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
// import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
const axios = require("axios");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      showPassword: false,
      showConfirmPassword: false,
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({ showConfirmPassword: !prevState.showConfirmPassword }));
  };

  register = () => {

    if (this.state.password !== this.state.confirm_password) {
      swal({
        text: "Passwords do not match!",
        icon: "error",
        type: "error",
      });
      return;
    }

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      // this.props.history.push('/');
      this.props.navigate("/");
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
        backgroundSize: "cover",
        // backgroundColor: "pink",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
        //   backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
        // backgroundSize: "cover",
          // backgroundColor: "whitesmoke",
          backgroundColor: "aliceblue",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(210, 72, 72, 0.1)",
          width: "300px"
        }}
      >

      <div style={{ marginTop: '100px' }}>
        <div>
          <h2 style={{ textAlign:"center",margin:"5", borderLeft:"-20px"}}>Register</h2>
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
              fullWidth
            required
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
          <br />
          <TextField
            id="standard-basic"
            type={this.state.showConfirmPassword ? "text" : "password"} 
            // type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password*"
             variant="outlined"
              margin="normal"
              fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/");
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default withRouter(Register);
