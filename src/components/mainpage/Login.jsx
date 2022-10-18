import { useContext } from "react";
import { Button, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { AppContext } from "../../App";

const Login = () => {
  const { handleSubmit } = useContext(AppContext);
  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Type Your Email"
                type="email"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Type Your Password"
                type="password"
              />
            </FormGroup>
          </Col>
        </Row>
        <Button className="signIn" color="warning">
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default Login;
