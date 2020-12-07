import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Section,
} from "reactstrap";
import UserContext from "../utils/UserContext";
import MotiveQuote from "../components/MotiveQuote";
import "./Auth/style.css";
import Search from "../components/Search";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import Highlighter from "react-highlight-words";

function Newsfeed(props) {
  const { loggedIn } = useContext(UserContext);
  const [AllPost, setAllPost] = useState([]);
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    loadPost();
    searchSubject();
  }, []);
  function handleInputChange(event) {
    setSearch(event.target.value);
  }
  function searchSubject() {
    API.searchSubject().then((res) => {
      setSubjects(res.data);
    });
  }
  function loadPost() {
    API.newsfeed()
      .then((res) => {
        setAllPost(res.data);
      })
      .catch((err) => console.log(err));
  }
  function deletePost(id) {
    API.deletePost(id)
      .then((res) => loadPost())
      .catch((err) => console.log(err));
  }
  const submitSearch = () => {
    API.getSearch(search)
      .then((res) => {
        console.log("Search Results: ", res.data);
        setAllPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        {!loggedIn ? (
          <Col>
            <h1 className="TypographyHeader">Welcome to Study Buddy!</h1>

            <p id="TypographyPara">
              Study Buddy is designed to help you connect with fellow students
              or like minded folks who would like to study the same subject
              together.
              <br />
              <br />
              <Highlighter
                highlightClassName="LoginParagraph"
                searchWords={["Login", "Choose a Subject", "Choose to Connect"]}
                autoEscape={true}
                textToHighlight="Login, Choose a Subject, Choose to Connect Virtually or
                in Person and Choose how many people you'd like to study with. You
                can see who's studying the same subject and connect with them."
              />
            </p>
            <br />
          </Col>
        ) : (
          ""
        )}
      </Row>
      {loggedIn ? (
        <Row>
          <Col>
          <MotiveQuote />
          </Col>
          <Col xs="auto">
            <Search
              setSearch={setSearch}
              submitSearch={submitSearch}
              search={search}
              subjects={subjects}
              handleInputChange={handleInputChange}
            />
          </Col>
          
          <Row xs="3">
            {AllPost.map((post, i) => (
              <div key={i}>
                <Card>
                  <Row className="delete_button">
                    <Col>
                      <Button
                        className="float-right"
                        close
                        onClick={() => deletePost(post._id)}
                      />
                    </Col>
                  </Row>
                  <CardImg className="Image" />
                  <img
                    className="card__image"
                    src={post.userId.Image}
                    width="215px"
                    justify-content="center"
                    align-items="center"
                    alt="profile pic"
                  ></img>
                  <CardBody className="grid-child-posts">
                    <CardTitle>
                      <CardText className="card__name">
                        <span>{post.userId.username}</span>
                      </CardText>
                    </CardTitle>
                    <CardTitle>
                      <Row xs="1">
                        <Col>
                          <div className="value">Buddies</div>
                          <div className="type">{post.group}</div>
                        </Col>
                        <Col>
                          <div className="value">Subject</div>
                          <div className="type">{post.subject}</div>
                        </Col>
                      </Row>
                    </CardTitle>
                    <Row>
                      <Col>
                        <ul className="social-icons">
                          <li>
                            <a
                              href="https://www.instagram.com/"
                              title="link to Instagram"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-instagram">
                                <FaInstagram />
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://twitter.com/"
                              title="link to Twitter"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-twitter">
                                <FaTwitter />
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.linkedin.com/"
                              title="link to LinkedIn"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-linkedin">
                                <FaLinkedinIn />
                              </i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://github.com/"
                              title="link to Github"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-github">
                                <FaGithub />
                              </i>
                            </a>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className="Connect-Button">
                          <Link to={"/post/" + post._id}>
                            <strong>Lets Link Up!</strong>
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                    <CardFooter className="footer-background">
                      <Col className="Date">
                        {moment(post.date).format("MMMM Do YYYY")}
                      </Col>
                      <Col className="Location">{post.location}</Col>
                    </CardFooter>
                  </CardBody>
                </Card>
              </div>
            ))}
          </Row>
        </Row>
      ) : (
        <Row>
          <Col>
            <div id="loginSection">
              <h4> Log in to view this page </h4>
              <Link to="/login">
                <Button> Login </Button>
              </Link>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Newsfeed;
