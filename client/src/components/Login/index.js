import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import "./style.css";

const Login = () => {
  const { userData, handleInputChange, handleLogin } = useContext(UserContext);
  return (
    <div id="mainBody">
      <h2 className="loginTitle">Login</h2>
      <hr />
      <Row>
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button onClick={handleLogin} color="primary" block>
              Login
            </Button>
            <p className="signupLink">
              <Link to="/signup">Don't have an account? Sign up here</Link>
            </p>
            <p className="resetLink">
          <Link to="/pass">Forgot password?</Link>
        </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
