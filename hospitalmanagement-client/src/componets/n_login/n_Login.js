import React, { Component } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, Route, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.webp";
import login from "../../assets/n_login.svg";
import "./n_Login.css";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export default class n_Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  };
  //const clientId = 727047923764-j5ifqv3drru2f5p03okf9q8141r423ab.apps.googleusercontent.com

  handleChange = (event) => {
    const isCheckbox = event.target.type == "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  validate = () => {
    const { email, password } = this.state;

    const data = {
      email: email,
      password: password,
    };
    axios.post("http://localhost:8000/login", data).then((res) => {
      if (res.status === 200) {
        const token = res.data.token; // Assuming the token is returned in the response.
    localStorage.setItem("token", token); // Store the token in local storage.
        this.setState({
          email: "",
          password: "",
          isAuthenticated: true,
        }); 
        alert("Authenticated Successfully");
      } else if (res.status === 400) {
        alert("Authentication was Fail!!!");
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const navigate = useNavigate;
    const isValid = this.validate();
    if (isValid) {
      console.log(isValid);
      //rediect to home
      navigate("/home");
    }
    console.log(isValid);
  };

  handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse.credential);
    var decoded = jwt_decode(credentialResponse.credential);
    console.log(decoded);
    window.location.href = `/home?name=${decoded.name}`;
  };
  
  render() {
    // const { email, password, isAuthenticated } = this.state;
    // if (isAuthenticated) {
    //   return <Route to="/home" />;
    // }
    return (
      <>
      
        <Container className="mt-5">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Form class="text-left" onSubmit={this.handleSubmit}>
                <img class="icon-img" src={logo} />
                <label for="Login" className="login-title font-weight-bold">
                  Login
                </label>
                <div
                  style={{
                    fontSize: 18,
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {this.state.emailError}
                </div>
                <Form.Group
                  className="mb-3 text-left"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  {/* <div
                    style={{ fontSize: 16, color: "red", fontStyle: "italic" }}
                  >
                    {this.state.emailError}
                  </div> */}
                </Form.Group>

                <Form.Group
                  className="mb-3 text-left"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  {/* <div
                    style={{ fontSize: 16, color: "red", fontStyle: "italic" }}
                  >
                    {this.state.passwordError}
                  </div> */}
                </Form.Group>

                <Button variant="primary btn-block" type="submit">
                  Login
                </Button>
                <div className="text-left at-3">
                  <a href="/register">
                    <small className="account">Create an account</small>
                  </a>
                </div>
                <hr className="or-line" />
                <div>
                  <GoogleOAuthProvider clientId="727047923764-j5ifqv3drru2f5p03okf9q8141r423ab.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={this.handleGoogleLoginSuccess}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider>
                </div>
              </Form>
            </Col>
            <Col lg={8} md={6} sm={12}>
              <img class="login-img" src={login} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
