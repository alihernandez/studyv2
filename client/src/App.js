import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
import Newsfeed from "./pages/Newsfeed";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import Message from "./pages/Message";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import UserContext from "./utils/UserContext";
import SendReset from "./components/Forgot/sendReset"
import resetPass from "./components/Forgot/resetForm";
import withAuth from "./components/withAuth/withAuth";





const App = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    image: "",
  });
  const [loggedIn, setLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [imageSelected, setImageSelected] = useState("");

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState('');

 

  useEffect(() => {
    isLoggedIn();
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: userData.username,
      password: userData.password,
    };
    if (userData.username && userData.password) {
      API.login(data)
        .then((user) => {
          if (user.data.loggedIn) {
            setLoggedin(true);
            setUser(user.data.user);
            console.log(user.data.user);
            console.log("log in successful");
            window.location.href = "/profile";
          } else {
            console.log("Something went wrong :(");
            alert("Login failed, Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSignup = (profilePic) => {
    // event.preventDefault();
    try {
      const data = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        Image: profilePic,
      };
      console.log(profilePic);
      console.log(data);
      if (userData.username && userData.password) {
        API.signup(data)
          .then((user) => {
            console.log(user);
            if (user.data === "email is already in use") {
              alert("Email already in use.");
            }
            if (user.data.loggedIn) {
              if (user.data.loggedIn) {
                setLoggedin(true);
                setUser(user.data.user);
                window.location.href = "/profile";
              } else {
                console.log("something went wrong :(");
                console.log(user.data);
                setFailureMessage(user.data);
              }
            } 
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log("App -> error", error);
    }
  };

  const isLoggedIn = () => {
    if (!loggedIn) {
      API.isLoggedIn().then((user) => {
        if (user.data.loggedIn) {
          setLoggedin(true);
          setUser(user.data.user);
        } else {
          console.log(user.data.message);
        }
      });
    }
  };
  
  const uploadImage = async (e) => {
    const data = new FormData();
    data.append("file", imageSelected);
    data.append("upload_preset", "gsthrmj6");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/studybuddycloud/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    handleSignup(file.secure_url);
      console.log(userData.email)
    await setEmail(userData.email)
    

  
    console.log({ email, message });
    const response = await fetch("/sendMail", { 
      method: 'POST', 
      headers: { 
          'Content-type': 'application/json'
      }, 
      body: JSON.stringify({email: userData.email}) 
  }); 
    const resData = await response.json(); 
    if (resData.status === 'success'){
      alert("Message Sent."); 
      this.resetForm()
  }else if(resData.status === 'fail'){
      alert("Message failed to send.")
  }
  };

  // const setUpProfilePic = (image) => {
  //   API.postProfilePic({profilePic: image})
  //   .then(res=> {
  //     setImage(res.data.profilePic);
  //     console.log(res.data.profilePic)
  //   })
  //   .then(handleSignup())
  // }

  const logout = () => {
    if (loggedIn) {
      API.logout().then(() => {
        console.log("logged out successfully");
        setLoggedin(false);
        setUser(null);
      });
    }
  };

  
  

  const contextValue = {
    userData,
    loggedIn,
    user,
    failureMessage,
    handleInputChange,
    handleLogin,
    handleSignup,
    logout,
    setImageSelected,
    uploadImage,
  };


  
  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <div id="bodyHeight">
          <TopNav />
            <Switch>
              <Route exact path="/" component={Newsfeed} />
              <Route
                exact
                path="/login"
                render={() => <Auth action="login" />}
              />
              <Route
                
                path="/reset"
                component = {withAuth(resetPass)}
              />
              <Route
                exact
                path="/pass"
                component = {SendReset}
              />
              <Route
                exact
                path="/signup"
                render={() => <Auth action="signup" />}
              />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/newsfeed" component={Newsfeed} />
              <Route exact path="/post/:id" component={Message} />
              <Route render={NoMatch} />
            </Switch>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
