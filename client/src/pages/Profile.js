import React, { useState, useContext } from "react";
import API from "../utils/API";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";
import "./style.css";

function Member(props) {
  const { user, loggedIn } = useContext(UserContext);
  const [Subject, setSubject] = useState("");
  const [Group, setGroup] = useState(0);
  const [Notes, setNotes] = useState("");
  const [Location, setLocation] = useState("");

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc

  const handleUserBtnClick = async (e) => {
    try {
      const res = await API.postPost({
        subject: Subject,
        group: Group,
        notes: Notes,
        location: Location,
        userId: user._id,
      });
      console.log(res);
      window.location.href = "/newsfeed";
    } catch (error) {
      console.log(
        "There was an error processing your results, please try again",
        error
      );
    }
  };

  return (
    <Container fluid>
      <Row>
        {loggedIn ? (
          <Col id="reqBody" sm="12" md={{ size: 6, offset: 3 }}>
            <h1> Welcome back {user && user.firstname}</h1>
            <h3>Looking for a Study Buddy?</h3>
            <img
              alt="user"
              src={user && user.Image}
              width="200px"
              className="float-left"
              alt="user profile pic"
              id="avatar"
            ></img>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                Subject
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="file"
                  id="inputSubject"
                  onChange={(e) => setSubject(e.target.value)}
                />
                <FormText color="muted" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
                Study Group
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                Notes
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="file"
                  id="inputNotes"
                  onChange={(e) => setNotes(e.target.value)}
                />
                <FormText color="muted" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                Location
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="file"
                  id="inputLocation"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <FormText color="muted" />
              </Col>
            </FormGroup>
            <Button onClick={handleUserBtnClick}>Submit Post</Button>
          </Col>
        ) : (
          <div className="Profile_Login">
            
            <h1> Login to view this page </h1>
            <Link to="/login">
              <Button id="Profile_Login_Button"> Login </Button>
            </Link>
            
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Member;
