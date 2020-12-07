import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  Input,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  CardGroup,
} from "reactstrap";
import UserContext from "../utils/UserContext";
import moment from "moment";
import Login from "../components/Login";

function Message(props) {
  const { user, loggedIn } = useContext(UserContext);
  const [CurrentPost, setCurrentPost] = useState({});
  const [CurrentPostAuthor, setCurrentPostAuthor] = useState("");
  const [Comment, setComment] = useState("");
  const [DisplayComments, setDisplayComments] = useState([]);
  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    loadPost();
    loadComments();
  });

  function loadComments() {
    API.getComments(id)
      .then((res) => {
        // setCurrentPost(res.data);
        // setCurrentPostAuthor(res.data.userId.username);
        setDisplayComments(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadPost() {
    API.getPost(id)
      .then((res) => {
        setCurrentPost(res.data);
        setCurrentPostAuthor(res.data.userId.username);
      })
      .then(() => console.log(CurrentPostAuthor))
      .catch((err) => console.log(err));
  }

  const handleUserBtnClick = async (e) => {
    try {
      const res = await API.postComment({
        comment: Comment,
        userId: user._id,
        postId: id,
      });
      loadComments();
    } catch (error) {
      console.log(
        "There was an error processing your results, please try again",
        error
      );
    }
  };

  return (
    <>
      {loggedIn ? (
        <Container>
          <Row>
            <Col sm="3" md={{ size: 3 }}></Col>
            <Col sm="6" md={{ size: 6 }}>
              <Card key={CurrentPost._id}>
                <CardHeader>{CurrentPostAuthor}</CardHeader>
                <CardHeader>Subject: {CurrentPost.subject}</CardHeader>

                <CardBody>
                  <Row>
                    <Col sm="4" md={{ size: 4 }}>
                      <CardTitle>Notes: </CardTitle>
                      <CardText>{CurrentPost.notes}</CardText>
                    </Col>
                    <Col sm="4" md={{ size: 4 }}>
                      <CardTitle>Group Size: </CardTitle>
                      <CardText>{CurrentPost.group}</CardText>
                    </Col>
                    <Col sm="4" md={{ size: 4 }}>
                      <CardTitle>Location: </CardTitle>
                      <CardText>{CurrentPost.location}</CardText>
                    </Col>
                  </Row>
                </CardBody>

                <CardFooter>
                  {moment(CurrentPost.date).startOf("minute").fromNow()}
                </CardFooter>
              </Card>
            </Col>
            <Col sm="3" md={{ size: 3 }}></Col>
          </Row>

          <div id="messageBody">
            {DisplayComments.map((comment) => (
              <Row key={comment._id}>
                {/* <Col sm="2" md={{ size: 2 }}></Col> */}

                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  {CurrentPostAuthor === comment.userId.username ? (
                    <CardGroup className="float-right">
                      <Card className="bg-info clearfix">
                        <CardBody className="float-right">
                          <b>{comment.userId.username}</b>: {comment.comment}
                        </CardBody>
                        <CardFooter>
                          {moment(comment.date).format("MMMM Do YYYY, h:mm a")}
                        </CardFooter>
                      </Card>
                    </CardGroup>
                  ) : (
                    <CardGroup className="float-left" key={comment._id}>
                      <Card className="float-left">
                        <CardBody>
                          <b>{comment.userId.username}</b>: {comment.comment}
                        </CardBody>
                        <CardFooter>
                          {" "}
                          {moment(comment.date).format("MMMM Do YYYY, h:mm a")}
                        </CardFooter>
                      </Card>
                    </CardGroup>
                  )}
                </Col>

                {/* <Col sm="2" md={{ size: 2 }}></Col> */}
              </Row>
            ))}
          </div>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader>Reply</CardHeader>
                <CardBody>
                  <Input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                  ></Input>
                </CardBody>
                <Button onClick={handleUserBtnClick}>Submit</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Login />
      )}
    </>
  );
}
export default Message;
